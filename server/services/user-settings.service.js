import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import pool from "../config/db.config.js";
import MailService from "./mail.service.js";
import Exception from "../errors/Exception.js";
import status from "http-status";
import HttpStatus from "../enums/HttpStatus.enum.js";

class UserSettingService {
  static async #resetKey(args, prefix) {
    const { id } = args;
    const updateQuery = `UPDATE "user" SET reset_key = $2, reset_end_date = $3 WHERE id = $1`;
    const reset_key = this.#generate_key();
    const reset_key_end_date = new Date(new Date().getTime() + 5 * 60000);
    await pool.query(updateQuery, [id, reset_key, reset_key_end_date]);
    const link = `http://localhost:4000/api/user_settings/${prefix}/verify?token=${reset_key}`;
    const content = `Someone, hopefully you, has requested to reset the password for your Matcha account on https://matcha.com
      </br>If you did not perform this request, you can safely ignore this email.
      </br>Otherwise, click the link below to complete the process.
      </br><a href=${link}>Reset password</a>`;
    // await MailService.sendEmail({
    //   toEmail: email,
    //   subject: "Reset password instructions",
    //   content,
    // });
    console.log("Link", link);
    console.log("Content", content);
  }

  static async resetPassword(args) {
    const { email } = args;
    const searchQuery = `SELECT * FROM "user" WHERE email = $1`;
    const row = await pool.query(searchQuery, [email]);
    if (row.rowCount > 0) {
      const user = row.rows[0];
      await this.#resetKey({ id: user.id }, "password");
    }
  }

  static async editPassword(args) {
    const { reset_key, password } = args;
    const current_date = new Date();
    const searchQuery = `SELECT * FROM "user" WHERE reset_key = $1`;
    const row = await pool.query(searchQuery, [reset_key]);

    if (row.rowCount > 0) {
      const user = row.rows[0];
      console.log("Current_date", current_date);
      console.log("user.reset_end_date", user.reset_end_date);
      if (user.reset_end_date < current_date) {
        await this.#resetKey({ id: user.id }, "password");
        throw new Exception(
          HttpStatus.RESET_KEY_EXPIRED,
          status.CONFLICT,
          "Reset key is expired. A new reset key was generated and sent to the mail related to your account"
        );
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      await pool.query(
        `UPDATE "user" SET password = $2, reset_key = null, reset_end_date = null WHERE id = $1`,
        [user.id, hashPass]
      );
    } else {
      throw new Exception(
        HttpStatus.RESET_KEY_NOT_FOUND,
        status.NOT_FOUND,
        "Reset key is invalid or has already been used."
      );
    }
  }

  static async verifyPasswordToken(args) {
    const { token } = args;
    return token;
  }

  static async resetEmail(args) {
    const { email } = args;
    const searchQuery = `SELECT * FROM "user" WHERE email = $1`;
    const row = await pool.query(searchQuery, [email]);
    if (row.rowCount > 0) {
      const user = row.rows[0];
      await this.#resetKey({ id: user.id }, "email");
    }
  }

  static async editEmail(args) {
    const { reset_key, email } = args;
    const current_date = new Date();
    const searchQuery = `SELECT * FROM "user" WHERE reset_key = $1`;
    const row = await pool.query(searchQuery, [reset_key]);

    if (row.rowCount > 0) {
      const user = row.rows[0];
      console.log("Current_date", current_date);
      console.log("user.reset_end_date", user.reset_end_date);
      if (user.reset_end_date < current_date) {
        await this.#resetKey({ id: user.id }, "email");
        throw new Exception(
          HttpStatus.RESET_KEY_EXPIRED,
          status.CONFLICT,
          "Reset key is expired. A new reset key was generated and sent to the mail related to your account"
        );
      }
      await pool.query(
        `UPDATE "user" SET email = $2, reset_key = null, reset_end_date = null WHERE id = $1`,
        [user.id, email]
      );
    } else {
      throw new Exception(
        HttpStatus.RESET_KEY_NOT_FOUND,
        status.NOT_FOUND,
        "Reset key is invalid or has already been used."
      );
    }
  }

  static async verifyEmailToken(args) {
    const { token } = args;
    return token;
  }

  static #generate_key() {
    return uuidv4().replace(/-/g, "");
  }
}

export default UserSettingService;
