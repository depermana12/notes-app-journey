import {
  getNotesFromStorage,
  postNotesToStorage,
  updateNotesInStorage,
  removeNotesFromStorage,
} from "./store.js";

const $ = {
  notesForm: document.getElementById("notes-form"),
  notesTitle: document.getElementById("notes-title"),
  notesContent: document.getElementById("notes-content"),
  notesSubmit: document.getElementById("notes-form").querySelector("button"),
  notesContainer: document.getElementById("notes-container"),
  searchInput: document.getElementById("search-input"),
};

const state = {
  editNotes: false,
};

function createCardElement(title, content) {
  const card = document.createElement("div");
  card.className = "card";

  const meta = createMetaInfo();
  card.appendChild(meta);

  const cardTitle = document.createElement("h3");
  cardTitle.textContent = title;
  card.appendChild(cardTitle);

  const cardContent = document.createElement("p");
  cardContent.className = "paragraph";
  cardContent.textContent = content;
  card.appendChild(cardContent);

  return card;
}

function createMetaInfo() {
  const meta = document.createElement("div");
  meta.className = "meta";

  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const date = document.createElement("p");
  const small = document.createElement("small");
  small.textContent = dateNow;
  date.appendChild(small);
  meta.appendChild(date);

  const notesOption = document.createElement("div");
  notesOption.className = "list";
  notesOption.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                  <path
                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                  />
                </svg>

                <div class="dropdown-content">
                  <button class="edit-notes">Edit</button>
                  <button class="delete-notes">Delete</button>
                </div>
  `;

  meta.appendChild(notesOption);
  return meta;
}

function resetForm() {
  $.notesTitle.value = "";
  $.notesContent.value = "";

  if (state.editNotes) {
    $.notesSubmit.style.backgroundColor = "var(--plum)";
    $.notesSubmit.textContent = "Save Note";
    state.editNotes = false;
  }
}

// add a card to the DOM
function addNotesToDOM(title, content) {
  const card = createCardElement(title, content);
  $.notesContainer.appendChild(card);
}

function renderNotes() {
  const notesFromStorage = getNotesFromStorage();
  $.notesContainer.innerHTML = "";
  notesFromStorage.forEach((note) => {
    addNotesToDOM(note.title, note.content);
  });
}

function handleNotesSubmit(event) {
  event.preventDefault();

  const title = $.notesTitle.value.trim();
  const content = $.notesContent.value.trim();

  if (title === "" && content === "") {
    alert("field cannot be empty");
    return;
  }

  const notesFromStorage = getNotesFromStorage();

  if (state.editNotes) {
    updateNotesInStorage(title, content);
  } else {
    const newNotes = { title, content };
    notesFromStorage.push(newNotes);
    postNotesToStorage(notesFromStorage);
  }
  renderNotes();
  resetForm();
}

function handleNotesOption(event) {
  const cardElement = event.target.closest(".card");
  if (event.target.classList.contains("delete-notes")) {
    removeNotesDOMandStorage(cardElement);
  } else if (event.target.classList.contains("edit-notes")) {
    setEditNotes(cardElement);
  }
}

function setEditNotes(notes) {
  state.editNotes = true;

  const cards = $.notesContainer.querySelectorAll(".card");

  cards.forEach((card) => {
    card.classList.remove("edit-mode");
  });

  notes.classList.add("edit-mode");

  let title = notes.querySelector("h3");
  let content = notes.querySelector(".paragraph");

  $.notesTitle.value = title.textContent;
  $.notesContent.value = content.textContent;

  $.notesSubmit.style.backgroundColor = "var(--secondary-color)";
  $.notesSubmit.textContent = "Update Notes";
}

function removeNotesDOMandStorage(notes) {
  if (confirm("Are you sure?")) {
    // remove card from the DOM
    notes.remove();

    // set the notes content as an id to filter through
    // the removeNotesFromStorage.
    // maybe this is a bad idea
    const notesContent = notes.querySelector(".paragraph");
    removeNotesFromStorage(notesContent.textContent);
  }
}

function searchNotesContent() {
  let searchValue = $.searchInput.value.toLowerCase();

  const notesFromStorage = getNotesFromStorage();

  const filteredSearch = notesFromStorage.filter((notes) =>
    notes.content.toLowerCase().includes(searchValue),
  );

  $.notesContainer.innerHTML = "";
  filteredSearch.forEach((notes) => {
    addNotesToDOM(notes.title, notes.content);
  });

  console.log(filteredSearch);
}

$.notesForm.addEventListener("submit", handleNotesSubmit);
$.notesContainer.addEventListener("click", handleNotesOption);
$.searchInput.addEventListener("input", searchNotesContent);
document.addEventListener("DOMContentLoaded", renderNotes);
