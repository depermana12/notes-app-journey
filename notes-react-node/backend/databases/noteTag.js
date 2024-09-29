import pool from "./db.js";

export const getTagByNoteId = async (noteId) => {
  const { rows } = await pool.query(
    `SELECT name FROM tags 
       JOIN notes_tags
     ON tags.tag_id = notes_tags.tag_id
       WHERE notes_tags.tag_id = $1`,
    [noteId],
  );
  return rows;
};

export const addTagToNote = async (noteId, tagId) => {
  await pool.query(
    `INSERT INTO notes_tags(note_id, tag_id)
       VALUES($1, $2)`,
    [noteId, tagId],
  );
};

export const removeTagFromNote = async (tag_id) => {
  await pool.query(`DELETE FROM notes_tags WHERE tag_id = $1`, [tag_id]);
};
