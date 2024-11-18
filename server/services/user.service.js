import pool from "../config/db.config.js";

class UserService {
  static async update(userId, args) {
    const querySearch = `SELECT *,ST_X(location::geometry) AS longitude,
    ST_Y(location::geometry) AS latitude, array_to_json(tags) AS formatted_tags, array_to_json(sexual_preference) as formatted_sexual_preference FROM "user" WHERE id = $1 and verified = true`;
    let updateQuery = `UPDATE "user" SET `;
    const {
      first_name,
      last_name,
      gender,
      sexual_preferences,
      biography,
      tags,
      default_cover,
      latitude,
      longitude,
      birthday,
    } = args;
    const row = await pool.query(querySearch, [userId]);
    console.log(row.rows[0]);
    const values = [];
    if (row.rowCount > 0) {
      const user = row.rows[0];
      values.push(userId);
      if (first_name) {
        updateQuery += "first_name = $2,";
        values.push(first_name);
      } else {
        updateQuery += "first_name = $2,";
        values.push(user.first_name);
      }
      if (last_name) {
        updateQuery += "last_name = $3,";
        values.push(last_name);
      } else {
        updateQuery += "last_name = $3,";
        values.push(user.last_name);
      }
      if (gender) {
        updateQuery += "gender = $4,";
        values.push(gender);
      } else {
        updateQuery += "gender = $4,";
        values.push(user.gender);
      }
      if (biography) {
        updateQuery += "biography = $5,";
        values.push(biography);
      } else {
        updateQuery += "biography = $5,";
        values.push(user.biography);
      }
      if (tags) {
        updateQuery += "tags = $6,";
        if (user.tags) {
          tags.push(...user.formatted_tags);
        }
        const uniqueElements = new Set(tags);
        values.push(Array.from(uniqueElements));
      } else {
        const tgs = user.tags ? user.tags : [];
        updateQuery += "tags = $6,";
        values.push(tgs);
      }
      if (default_cover) {
        updateQuery += "default_cover = $7,";
        values.push(default_cover);
      } else {
        updateQuery += "default_cover = $7,";
        values.push(user.default_cover);
      }
      if (latitude && longitude) {
        updateQuery += "location = ST_SetSRID(ST_MakePoint($8, $9), 4326),";
        values.push(longitude);
        values.push(latitude);
      } else {
        updateQuery += "location = ST_SetSRID(ST_MakePoint($8, $9), 4326),";
        values.push(user.longitude);
        values.push(user.latitude);
      }
      if (sexual_preferences) {
        updateQuery += "sexual_preference = $10,";
        if (user.sexual_preference) {
          sexual_preferences.push(...user.formatted_sexual_preference);
        }
        const uniqueElements = new Set(sexual_preferences);
        values.push(Array.from(uniqueElements));
      } else {
        const sexual_preference = user.sexual_preference
          ? user.sexual_preference
          : [];
        updateQuery += "sexual_preference = $10,";
        values.push(sexual_preference);
      }
      if (birthday) {
        updateQuery += "birthday = $11,";
        values.push(birthday);
      } else {
        updateQuery += "birthday = $11,";
        values.push(user.birthday);
      }
      updateQuery = updateQuery.slice(0, -1);
      updateQuery +=
        " WHERE id = $1 RETURNING id, first_name, last_name, username, email, gender, biography, default_cover, last_time_connected, ST_X(location::geometry) AS longitude, ST_Y(location::geometry) AS latitude, birthday, array_to_json(tags) as tags, array_to_json(sexual_preference) as sexual_preferences;";
      console.log(updateQuery, values);
      const updatedRow = await pool.query(updateQuery, values);
      return updatedRow.rows[0];
    }
  }

  static async getUsersByCriteria(userId, args) {
    const {
      min_age,
      max_age,
      fame_rating,
      distance,
      interests,
      size,
      page,
      skip,
      sorting,
    } = args;
    console.log("query", { size, page, skip, sorting });
    const row = await pool.query(
      `SELECT *, date_part('year', age(birthday)) as formatted_age FROM "user" WHERE id = $1`,
      [userId]
    );
    const user = row.rows[0];
    let selectQuery = `SELECT *, date_part('year', age(birthday)) as age, ST_Distance(location, $1) as distance,
    array_to_json(tags) as tags FROM "user" WHERE id != $2 AND`;
    const values = [user.location, userId];
    if (min_age) {
      selectQuery += ` date_part('year', age(birthday)) >= ${min_age} AND`;
    }
    if (max_age) {
      selectQuery += ` date_part('year', age(birthday)) <= ${max_age} AND`;
    }
    if (distance) {
      selectQuery += ` ST_Distance(location, $3) <= ${distance} AND`;
      values.push(user.location);
    }
    if (interests) {
      selectQuery += ` tags && ARRAY${interests}::tag[] AND`;
    }
    selectQuery = selectQuery.slice(0, -3);
    selectQuery += ";";
    console.log(selectQuery);
    const rows = await pool.query(selectQuery, values);
    const data = rows.rows.map((obj) => ({
      id: obj.id,
      first_name: obj.first_name,
      last_name: obj.last_name,
      username: obj.username,
      gender: obj.gender,
      biography: obj.biography,
      default_cover: obj.default_cover,
      covers: [],
      last_time_connected: obj.last_time_connected,
      tags: obj.tags,
      age: obj.age,
      distance: obj.distance,
    }));
    return {
      data,
      pagination: {
        count: 1,
        page: 1,
        size: 3,
        total: 3,
      },
    };
  }

  static async suggestionUsersBasedOnCriteria(userId, args) {}
}

export default UserService;
