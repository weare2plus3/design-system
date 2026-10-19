# Menu

A small button that opens a list of actions or links at elevation 3 (`shadow-3`), closing on Escape, a choice or a click elsewhere.

- **Provide:** `label` (the button text), `items` (`{label, onSelect}` or `{label, href}`, each with an optional `icon`; `'-'` for a divider), and optionally `align: 'end'` to open from the right edge, and `variant`/`size` for the trigger (secondary, small by default).
- Arrow keys move through the items; Escape returns focus to the button.
- Use for secondary actions that don't deserve their own button: share, download, sort. Keep it to seven items or fewer.
- Don't: use it for main navigation (use Header) or for choosing a form value (use Select).
