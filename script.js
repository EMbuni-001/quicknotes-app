

const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all-btn");
const STORAGE_KEY = "quicknotes";

let notes = loadNotes();

function loadNotes() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
}

function saveNotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function render() {
    list.innerHTML = ""; // clear the old list (safe: no user text)
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredNotes = notes.filter(note => 
        note.text.toLowerCase().includes(searchTerm)
    );

    if (filteredNotes.length === 0 && searchTerm !== "") {
        const li = document.createElement("li");
        li.textContent = "No notes match your search.";
        list.appendChild(li);
    } else {
        filteredNotes.forEach((note) => {
            const li = document.createElement("li");
            li.classList.add("note", `category-${note.category.toLowerCase()}`);
            
            const contentDiv = document.createElement("div");
            contentDiv.classList.add("note-content");
            
            const textSpan = document.createElement("span");
            textSpan.textContent = note.text; // safe for user text (prevents XSS)
            
            const metaP = document.createElement("p");
            metaP.classList.add("note-meta");
            metaP.textContent = `${note.category} • ${note.createdAt}`;
            
            contentDiv.appendChild(textSpan);
            contentDiv.appendChild(metaP);
            
            const del = document.createElement("button");
            del.textContent = "Delete";
            del.classList.add("delete-btn");
            // Closure: remembers the specific note.id
            del.addEventListener("click", () => deleteNote(note.id)); 
            
            li.appendChild(contentDiv);
            li.appendChild(del);
            list.appendChild(li);
        });
    }

        if (notes.length === 0) {
        count.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        count.textContent = "You have 1 note.";
    } else {
        count.textContent = `You have ${notes.length} notes.`;
    }
}

function addNote(text, category) {
    const now = new Date();
    const createdAt = now.toLocaleString();
    
    notes.push({ 
        id: Date.now(), 
        text: text, 
        category: category,
        createdAt: createdAt 
    });
    saveNotes();
    render();
}

function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);
    saveNotes();
    render();
}
form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop the page reload
    const text = input.value.trim();
    const category = categorySelect.value;
    
    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }
    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }
    
    errorMessage.textContent = ""; // Clear error on valid add
    addNote(text, category);
    input.value = "";
    input.focus();
});

searchInput.addEventListener("input", () => {
    render();
});

clearAllBtn.addEventListener("click", () => {
    if (confirm("Delete all notes?")) {
        notes = [];
        saveNotes();
        render();
    }
});

render();
