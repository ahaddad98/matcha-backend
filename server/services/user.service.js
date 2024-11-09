import pool from "../config/db.config.js";

class UserService {
  static async update(userId, args) {
    const querySearch = `SELECT * FROM "user" WHERE id = $1 and verified = true`;
    let updateQuery = "UPDATE user set ";
    const {
      first_name,
      last_name,
      email,
      gender,
      sexual_preferences,
      biography,
      tags,
      default_cover,
      covers,
      geoPoint,
    } = args;
    const user = await pool.query(querySearch, [userId]);
    const values = [];
    if (user) {
      if (first_name) {
        updateQuery += "first_name = $1,";
        values.push(first_name);
      }
      if (last_name) {
        updateQuery += "last_name = $2,";
        values.push(last_name);
      }
      if (email) {
        // verify if email not taken, and resent a verification link to validate email
        updateQuery += "email = $3,";
        values.push(email);
      }
      if (gender) {
        updateQuery += "gender = $4,";
        values.push(gender);
      }
      if (biography) {
        updateQuery += "biography = $5,";
        values.push(biography);
      }
      if (tags) {
        updateQuery += "tags = $6,";
        tags.push([...user.tags]);
        const uniqueElements = new Set(tags);
        values.push(Array.from(uniqueElements));
      }
      if (default_cover) {
        updateQuery += "default_cover = $7,";
      }
      if (covers) {
        //
      }
    }
    // throw exception
  }
}

export default UserService;
