# Select

A labelled dropdown for choosing one option from a list, built on the browser's own select so it works with keyboards, screen readers and phone pickers.

- **Provide:** `label`, `options` (strings, or `{value, label, disabled}`), and optionally `placeholder` (a first, unselectable "Choose…" option), `hint`, `error`, `value`/`defaultValue`, `onChange`.
- Use it when there are more than five options. For two to five, show them all with RadioGroup.
- Styled like TextField: same height, border and error treatment, with a chevron icon.
- Don't: use it for navigation (use Menu), or for a yes/no choice (use Checkbox).
