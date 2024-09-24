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
  return rows;
};

export const createNote = async (title, content) => {
  const newNotes = await pool.query(
    `INSERT INTO notes (title, content) VALUES($1, $2) RETURNING *`,
    [title, content],
  );

  return newNotes.rows;
};

export const updateNote = async (id, title, content) => {
  const updatedNote = await pool.query(
    `UPDATE notes SET title = $1, content = $2 WHERE note_id = $3`,
    [title, content, id],
  );
  return updatedNote;
};

export const deleteNote = async (id) => {
  const deletedNote = await pool.query(`DELETE FROM notes WHERE note_id = $1`, [
    id,
  ]);
  return deletedNote;
};
