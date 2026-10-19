# Dialog

A modal panel at elevation 4 (`shadow-4`) over a `scrim`, with a display-face title, short body, close button and right-aligned actions.

- **Provide:** `open`, `title`, `children` (one or two sentences), `actions` (Buttons, primary last), and `onClose`. `onClose` runs on the close button, Escape and a click on the scrim. The consumer owns the `open` state and returns focus to whatever opened the dialog.
- Use for a decision that has to be made before carrying on: confirming a purchase, discarding a draft. One dialog at a time.
- `inline` renders it in place instead of fixed over the page, for docs and previews only.
- Don't: use a dialog for information that could sit on the page, stack dialogs, or put a form longer than three fields in one.
