import pool from "./db.js";

export const getAllTags = async () => {
  const { rows } = await pool.query(`SELECT * FROM tags`);
  return rows;
};

export const getTagById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM tags WHERE tag_id = $1`, [
    id,
  ]);
  return rows[0];
};

export const createTag = async (name) => {
  const newTag = await pool.query(
    `INSERT INTO tags(name) VALUES($1) RETURNING*`,
    [name],
  );
  return newTag.rows[0];
};

export const updateTag = async (newTagName, id) => {
  const updatedTag = await pool.query(
    `UPDATE tags SET name = $1 WHERE tag_id = $2 RETURNING*`,
    [newTagName, id],
  );
  return updatedTag.rows[0];
};

export const deleteTag = async (id) => {
  const deletedTag = await pool.query(`DELETE FROM tags WHERE tag_id = $1`, [
    id,
  ]);
  return deletedTag.rowCount;
};
