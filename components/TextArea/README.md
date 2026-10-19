# TextArea

A labelled multi-line input for messages and notes, built like TextField: same label, hint, error and border.

- **Provide:** `label`, optional `hint`, `error`, `rows` (4 by default) and the usual textarea attributes (`value`, `onChange`, `maxLength`, `name`).
- Use for anything longer than one line: a card message, an enquiry, a review. It grows by dragging the corner, vertically only.
- When there's a length limit, say it in the hint ("Up to 200 characters").
- Don't: use it for a single value like a name or email (use TextField).
