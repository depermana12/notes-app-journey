import { parseArgs } from "node:util";
import {
  postNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "./notes.js";

const { values } = parseArgs({
  options: {
    post: {
      type: "boolean",
      short: "p",
    },
    get: {
      type: "boolean",
      short: "g",
    },
    getAll: {
      type: "boolean",
      short: "a",
    },
    update: {
      type: "boolean",
      short: "u",
    },
    delete: {
      type: "boolean",
      short: "d",
    },
    title: {
      type: "string",
      short: "t",
    },
    content: {
      type: "string",
      short: "c",
    },
    help: {
      type: "boolean",
      short: "h",
    },
  },
});

const printHelp = () => {
  console.log(`
  Usage:
    node app.js [options]
  Post note:
    node app.js [--post] [--title] <New Title> [--content] <This is the content of the new note>

  Options:
    --post,   -p     post a new note
    --get,    -g     get a note by title
    --getAll, -a     get all notes
    --update, -u     update a note
    --delete, -d     delete a note by title
    --title,  -t     title as note id
    --content,-c     content of the note
    --help,   -h     show this help message
  `);
};

if (values.post) {
  if (values.title && values.content) {
    postNote(values.title, values.content);
    console.log("note added successfully");
  } else {
    console.log("required title and content");
  }
} else if (values.get) {
  if (values.title) {
    const noteContent = getNote(values.title);
    console.log(noteContent);
  } else {
    console.log("required title as id");
  }
} else if (values.getAll) {
  const { notes } = getAllNotes();
  notes.forEach((note) => {
    console.log(`${note.title}: ${note.content}`);
  });
} else if (values.update) {
  if (values.title && values.content) {
    updateNote(values.title, values.content);
    console.log(`"${values.title}" note updated successfully`);
  } else {
    console.log("required title and content");
  }
} else if (values.delete) {
  if (values.title) {
    deleteNote(values.title);
    console.log(`"${values.title}" note deleted successfully`);
  } else {
    console.log("required title for delete note");
  }
} else {
  console.log("Invalid usage");
  printHelp();
}
