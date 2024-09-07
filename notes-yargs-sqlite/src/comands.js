import yargs from "yargs";
import { confirm } from "@inquirer/prompts";
import {
  insertNotes,
  updateNotes,
  getAllNotes,
  removeNotes,
  clearNotes,
} from "../db/db.js";

yargs(process.argv.slice(2))
  .command(
    "create <title> <content>",
    "Create a new note",
    (yargs) => {
      yargs.positional("title", {
        type: "string",
        description: "The title of the note",
      });
      yargs.positional("content", {
        type: "string",
        description: "The body of the note",
      });
    },
    async (argv) => {
      const { title, content } = argv;
      await insertNotes(title, content);
    },
  )
  .command(
    "list",
    "List all the notes",
    () => {},
    async () => {
      const notes = await getAllNotes();
      if (notes.length === 0) {
        console.log("No notes found");
      } else {
        notes.forEach((note) =>
          console.log(`TITLE: ${note.title}, BODY: ${note.content}`),
        );
      }
    },
  )
  .command(
    "find <title>",
    "Find notes by title",
    (yargs) => {
      yargs.positional("title", {
        type: "string",
        description: "The title of the note to search for",
      });
    },
    async (argv) => {
      const { title } = argv;
      const notes = await getAllNotes();
      const foundNotes = notes.filter((note) => note.title === title);
      foundNotes.forEach((note) =>
        console.log(`${note.title}: ${note.content}`),
      );
    },
  )
  .command(
    "update <title> <newTitle> <newContent>",
    "Update notes by title",
    (yargs) => {
      yargs.positional("title", {
        type: "string",
        description: "update to new title",
      });
      yargs.positional("newTitle", {
        type: "string",
        description: "new title to update",
      });
      yargs.positional("newContent", {
        type: "string",
        description: "new content to update notes content",
      });
    },
    async (argv) => {
      const { title, newTitle, newContent } = argv;
      await updateNotes(title, newTitle, newContent);
    },
  )
  .command(
    "remove <title>",
    "Remove a note by title",
    (yargs) => {
      yargs.positional("title", {
        type: "string",
        description: "The title of the note to remove",
      });
    },
    async (argv) => {
      const { title } = argv;
      const changes = await removeNotes(title);
      if (changes) {
        console.log(`Note with title "${title}" removed`);
      } else {
        console.log(`No note found with title "${title}"`);
      }
    },
  )
  .command(
    "clear",
    "Clear all notes",
    () => {},
    async () => {
      const answer = await confirm({
        message: "This will delete all notes. Are you sure?",
        default: false,
      });
      if (answer) {
        await clearNotes();
        console.log("All notes have been cleared");
      } else {
        console.log("Canceled");
      }
    },
  )
  .demandCommand(1)
  .parse();
