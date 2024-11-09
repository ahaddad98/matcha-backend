import pool from "../config/db.config.js";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Exception from "../errors/Exception.js";

class AuthService {
  static async login(args) {
    const querySearch = `SELECT * FROM "user" WHERE username = $1`;
    const user = await pool.query(querySearch, [args.username]);
    if (user) {
      const isMatched = await bcrypt.compareSync(args.password, user.password);
      if (isMatched) {
        const { token, refresh_token } = await this.generate_token({
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

  static async generate_token(payload) {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expireIn: "24h",
    });
    const refresh_token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expireIn: "2w",
    });
    return { token, refresh_token };
  }
}

export default AuthService;
