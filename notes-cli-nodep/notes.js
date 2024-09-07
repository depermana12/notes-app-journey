import fs from "fs";
import path from "path";

const __dirname = import.meta.dirname;
const BASE_PATH = path.resolve(__dirname);
const filePath = path.join(BASE_PATH, "./notes.json");

const readNoteFromFile = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("AAAAAH", error);
    return { notes: [] };
  }
};

const writeNoteToFile = (note) => {
  fs.writeFileSync(path.join(BASE_PATH, "./notes.json"), JSON.stringify(note));
};

export const getNote = (title) => {
  const { notes } = readNoteFromFile();
  const note = notes.find((note) => note.title === title);
  return note ? note.content : "Note not found";
};

export const getAllNotes = () => {
  return readNoteFromFile();
};

export const postNote = (title, content) => {
  const { notes } = readNoteFromFile();
  const note = {
    title,
    content,
  };
  const newNote = [...notes, { title, content }];
  writeNoteToFile({ notes: newNote });
};

export const updateNote = (title, content) => {
  const { notes } = readNoteFromFile();

  const index = notes.findIndex((note) => note.title === title);

  if (index !== -1) {
    notes[index].content = content;
    writeNoteToFile({ notes });
  } else {
    console.log("Note not found");
  }
};

export const deleteNote = (title) => {
  const { notes } = readNoteFromFile();
  const filteredNote = notes.filter((note) => note.title !== title);
  writeNoteToFile({ notes: filteredNote });
};
