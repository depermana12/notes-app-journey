import pool from "./db.js";

export const insertAvatar = async (filename, userId) => {
  const avatar = await pool.query(
    `INSERT INTO users_photo (filename, user_id) VALUES ($1, $2) RETURNING *`,
    [filename, userId],
  );

  return avatar.rows[0];
};
