import fs from "fs/promises";
import path from "path";
import util from "node:util";
import sqlite3 from "sqlite3";

const __dirname = import.meta.dirname;
const BASE_PATH = path.resolve(__dirname);

const notesDB = path.join(BASE_PATH, "./notes.db");
const DB_SQL = path.join(BASE_PATH, "./db.sql");

let SQL3;

const initDB = async () => {
  const myDB = new sqlite3.Database(notesDB, (err) => {
    if (err) {
      throw new Error(`failed to connect to the database: ${err.message}`);
    }
    console.log("database connected successfully");
  });

  SQL3 = {
    run(...args) {
      return new Promise((resolve, reject) => {
        myDB.run(...args, function (err) {
          if (err) reject("failed to insert query: ", err.message);
          else resolve(this);
        });
      });
    },
    get: util.promisify(myDB.get.bind(myDB)),
    all: util.promisify(myDB.all.bind(myDB)),
    exec: util.promisify(myDB.exec.bind(myDB)),
    close: util.promisify(myDB.close.bind(myDB)),
  };

  const initSQL = await fs.readFile(DB_SQL, "utf8");
  await SQL3.exec(initSQL);
};

await initDB();

export const insertNotes = async (title, content) => {
  return await SQL3.run(
    `
    INSERT INTO 
        notes (title, content)
    VALUES 
        (?, ?)`,
    [title, content],
  );
};

export const getAllNotes = async () => {
  return await SQL3.all("SELECT * FROM notes");
};

export const updateNotes = async (title, newTitle, newContent) => {
  return await SQL3.run(
    `
    UPDATE
        notes 
    SET
        title = ?, content = ? 
    WHERE
        title = ?`,
    [newTitle, newContent, title],
  );
};

export const removeNotes = async (title) => {
  return await SQL3.run(
    `
    DELETE FROM 
        notes 
    WHERE 
        title = ?`,
    [title],
  );
};

export const clearNotes = async () => {
  return await SQL3.run("DELETE FROM notes");
};

export const closeDatabase = () => {
  SQL3.close();
};
