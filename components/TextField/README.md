# TextField

A labelled single-line input with an optional hint or error, on a 1.5px `ink` border with `radius-sm`.

- **Provide:** `label` (always visible; never rely on the placeholder alone), and optionally `hint`, `error`, and any input attribute (`type`, `name`, `placeholder`, `value`, `onChange`, `required`).
- **error** replaces the hint. It turns the border and message `danger` and prefixes the message with "!", so the error never depends on colour. Say what to do: "Enter an email address like you@example.com."
- Width is up to 420px. Set a narrower container for short values (postcodes, quantities).
- Don't: hide the label, put the error only in a tooltip, or use `signal` for focus or errors.
