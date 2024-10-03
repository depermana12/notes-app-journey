import pool from "./db.js";

export const searchNote = async (term) => {
  const { rows } = await pool.query(
    `SELECT * FROM notes WHERE notes LIKE = $1`,
    [`%${term}%`],
  );
  return rows;
};

export const getAllNote = async () => {
  const { rows } = await pool.query(`SELECT * FROM notes`);
  return rows;
};

export const getNoteById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM notes WHERE note_id = $1`, [
    id,
  ]);
  return rows[0];
};

export const countNote = async () => {
  const { rows } = await pool.query(`SELECT COUNT(*) FROM notes`);
  return rows[0].count;
};

export const getNoteByPaginated = async (limit, offset) => {
  const { rows } = await pool.query(`SELECT * FROM notes LIMIT $1 OFFSET $2`, [
    limit,
    offset,
  ]);
  return rows;
};

export const createNote = async (title, content, id) => {
  const newNotes = await pool.query(
    `INSERT INTO notes (title, content, user_id) VALUES($1, $2, $3) RETURNING *`,
    [title, content, id],
  );
  return newNotes.rows;
};

export const updateNote = async (id, title, content) => {
  const updatedNote = await pool.query(
    `UPDATE notes SET title = $1, content = $2 WHERE note_id = $3 RETURNING *`,
    [title, content, id],
  );
  return updatedNote.rows[0];
};

export const deleteNote = async (id) => {
  const deletedNote = await pool.query(`DELETE FROM notes WHERE note_id = $1`, [
    id,
  ]);
  return deletedNote.rowCount;
};
