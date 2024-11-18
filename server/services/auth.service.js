import status from "http-status";
import pool from "../config/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Exception from "../errors/Exception.js";
import { v4 as uuidv4 } from "uuid";
import logger from "../log/logger.js";
import HttpStatus from "../enums/HttpStatus.enum.js";
import MailService from "./mail.service.js";

class AuthService {
  static async login(args) {
    const querySearch = `SELECT * FROM "user" WHERE username = $1 and verified = true`;
    const user = await pool.query(querySearch, [args.username]);
    if (user.rowCount > 0) {
      const password = user.rows[0].password;
      const isMatched = bcrypt.compareSync(args.password, password);
      if (isMatched) {
        const { token, refresh_token } = this.generate_token({
          id: user.rows[0].id,
          email: user.rows[0].email,
          first_name: user.rows[0].first_name,
          last_name: user.rows[0].last_name,
        });
        return {
          type: "Bearer",
          token,
          refresh_token,
          expireIn: 60000,
        };
      } else {
        throw new Exception(
          status[status.CONFLICT],
          status.CONFLICT,
          "invalid credentials"
        );
      }
    } else {
      throw new Exception(
        status[status.CONFLICT],
        status.CONFLICT,
        "invalid credentials"
      );
    }
  }

  static generate_key() {
    return uuidv4().replace(/-/g, "");
  }

  static generate_token(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    const refresh_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2w",
    });
    return { token, refresh_token };
  }

  static async register(args) {
    const insertUser = `INSERT INTO "user" (first_name, last_name, username, email, password, location, verification_key, verification_end_date)
    VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_MakePoint($6, $7), 4326), $8, $9)
    RETURNING id, first_name, last_name, username, email;
    `;
    const {
      email,
      first_name,
      last_name,
      password,
      username,
      latitude,
      longitude,
    } = args;
    const querySearch = `SELECT * FROM "user" WHERE email = $1 or username = $2`;
    const isExists = await pool.query(querySearch, [email, username]);
    if (isExists.rowCount > 0) {
      throw new Exception(
        status[status.CONFLICT],
        status.CONFLICT,
        "invalid credentials"
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
      longitude,
      latitude,
      verification_key,
      verification_end_date,
    ]);
    const verifyUrl = `http://localhost:4000/api/auth/verify?token=${verification_key}`;
    logger.info("User created verify link", verifyUrl);
    // await MailService.sendEmail({
    //   toEmail: email,
    //   subject: "Account Activation",
    //   content: `Please verify your account by clicking the following link: ${verifyUrl}`,
    // });
    return user.rows[0];
  }

  static async verify(token) {
    const querySearch = `SELECT * FROM "user" WHERE verification_key = $1;`;
    const verifyUser = `UPDATE user set verified = true, verification_key = null, verification_end_date = null WHERE id = $1`;
    const row = await pool.query(querySearch, [token]);
    if (row.rowCount > 0) {
      const current_date = new Date();
      const user = row.rows[0];
      if (user.verification_end_date < current_date) {
        throw new Exception(
          HttpStatus.EXPIRED_TOKEN,
          status.BAD_REQUEST,
          "token has been expired"
        );
      }
      const insertedRows = await pool.query(verifyUser, [user.id]);
      return insertedRows.rows[0];
    } else {
      throw new Exception(
        HttpStatus.ACTIVATION_KEY_NOT_FOUND,
        status.NOT_FOUND,
        "activation key not found"
      );
    }
  }
}

export default AuthService;
