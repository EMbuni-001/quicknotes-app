
# QuickNotes

QuickNotes is a simple, responsive note-taking web application built with HTML, CSS, and JavaScript. It allows users to quickly add, categorize, search, and delete notes, with all data persisting locally in the browser using `localStorage`.

## Features
- Add notes with text and categories (Personal, Work, Study).
- Delete individual notes.
- Real-time search filtering.
- Input validation (prevents empty notes and limits to 200 characters).
- Data persistence using `localStorage` (survives page refresh).
- Responsive Flexbox layout for mobile and desktop.
- "Clear all" functionality with user confirmation.

## How to Run Locally
1. Clone this repository to your local machine.
2. Open the `quicknotes-app` folder in VS Code.
3. Install the "Live Server" extension in VS Code (optional but recommended).
4. Right-click `index.html` and select "Open with Live Server", or simply open `index.html` directly in your web browser.

## What I Learned
1. How to apply `querySelector`, `createElement`, and `textContent` to build elements.
2. How to use `localStorage` on a page and watching the effect upon refreshing the page. 
3. How to prevent default form submission actions.
4. How to update an `EventListener` and functions to clear boxes after adding or deleting notes. 
5. How to add a `Clear all` button that asks for confirmation before deleting every note.
6. How to make the `Delete` button remove its own note.
