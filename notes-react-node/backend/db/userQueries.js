import pool from "./db.js";

export const getAllUser = async () => {
  const { rows } = await pool.query(`SELECT * FROM users`);
  return rows;
};

export const getUserById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [
    id,
  ]);
  return rows;
};

export const getUserByUsername = async (username) => {
  const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  return result.rows[0];
};

export const createUser = async (username, email, password) => {
  const newUser = await pool.query(
    `INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *`,
    [username, email, password],
  );
  return newUser.rows;
};

export const updateUser = async (id, username, email, password) => {
  const updatedUser = await pool.query(
    `UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *`,
    [username, email, password, id],
  );
  return updatedUser;
};

export const deleteUser = async (id) => {
  const deletedUser = await pool.query(`DELETE FROM users WHERE user_id = $1`, [
    id,
  ]);
  return deletedUser;
};
