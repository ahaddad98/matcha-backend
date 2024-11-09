import pool from "../config/db.config.js";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Exception from "../errors/Exception.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

class AuthService {
  static async login(args) {
    const querySearch = `SELECT * FROM "user" WHERE username = $1 and verified = true`;
    const user = await pool.query(querySearch, [args.username]);
    if (user) {
      const isMatched = bcrypt.compareSync(args.password, user.password);
      if (isMatched) {
        const { token, refresh_token } = this.generate_token({
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        });
        return {
          type: "Bearer",
          token,
          refresh_token,
          expireIn: 60000,
        };
      } else {
        throw new Exception(
          "INVALID_CREDIENTIEL",
          400,
          "invalid credentiel",
          "login"
        );
      }
    } else {
      throw new Error("INVALID_CREDIENTIEL");
    }
  }

  static generate_key() {
    return uuidv4().replace(/-/g, "");
  }

  static generate_token(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expireIn: "24h",
    });
    const refresh_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expireIn: "2w",
    });
    return { token, refresh_token };
  }

  static async register(args) {
    const transporter = nodemailer.createTransport("SMTP", {
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    const insertUser = `INSERT INTO user(first_name, last_name, username, email, password, latitude, longitude, verification_key, verification_end_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id, first_name, last_name, username, email;
    `;
    const { email, first_name, last_name, password, username, geoPoint } = args;
    const querySearch = `SELECT * FROM "user" WHERE email = $1`;
    const isExists = await pool.query(querySearch, [email]);
    if (isExists) {
      throw new Exception(
        "INVALID_CREDIENTIEL",
        400,
        "invalid credential",
        "register"
      );
    }
    const verification_key = this.generate_key();
    const verification_end_date = new Date(new Date().getTime() + 5 * 60000);
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const user = await pool.query(insertUser, [
      first_name,
      last_name,
      username,
      email,
      hashPass,
      geoPoint.latitude,
      geoPoint.longitude,
      verification_key,
      verification_end_date,
    ]);
    const verifyUrl = `http://${req.get(
      "host"
    )}/api/auth/verify?token=${verification_key}`;
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Account Verification",
      text: `Please verify your account by clicking the following link: ${verifyUrl}`,
    };

    await transporter.sendMail(mailOptions);
    return user;
  }

  static async verify(token) {
    const querySearch = `SELECT * FROM "user" WHERE verification_key = $1;`;
    const verifyUser = `UPDATE user set verified = true, verification_key = null, verification_end_date = null WHERE id = $1`;
    const user = await pool.query(querySearch, [token]);
    if (user) {
      const current_date = new Date();
      if (user.verification_end_date > current_date) {
        throw new Exception(
          "EXPIRED_TOKEN",
          400,
          "token has expired",
          "verify"
        );
      }
      await pool.query(verifyUser, [user.id]);
    } else {
      throw new Exception(
        "ACTIVATION_KEY_NOT_FOUND",
        404,
        "activation key not found",
        "verify"
      );
    }
  }
}

export default AuthService;
