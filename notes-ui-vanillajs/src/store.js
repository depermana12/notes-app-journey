export function getNotesFromStorage() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

export function postNotesToStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

export function updateNotesInStorage(newTitle, newContent) {
  const notesFromStorage = getNotesFromStorage();

  const updateCard = notesContainer.querySelector(".edit-mode");
  const cardTitleAsId = updateCard.querySelector("h3").textContent;

  const updatedNotes = notesFromStorage.map((note) => {
    if (note.title === cardTitleAsId) {
      return { title: newTitle, content: newContent };
    }
    return note;
  });
  postNotesToStorage(updatedNotes);
}

export function removeNotesFromStorage(notesContent) {
  let notesFromStorage = getNotesFromStorage();

  const notesFiltered = notesFromStorage.filter(
    (note) => note.content !== notesContent,
  );

  localStorage.setItem("notes", JSON.stringify(notesFiltered));
}
