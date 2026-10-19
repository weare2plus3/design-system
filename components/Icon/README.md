# Icon

The studio's own line icons: 21 shapes on a 24-unit grid with a 1.5 stroke and square ends, drawn in `currentColor` so they take the text colour around them.

- **Provide:** `name` (one of `arrow-right`, `arrow-left`, `external`, `chevron-down`, `chevron-right`, `plus`, `minus`, `close`, `check`, `menu`, `search`, `bag`, `user`, `heart`, `book`, `code`, `gift`, `mail`, `info`, `alert`, `download`), optional `size` (20px default) and `label`.
- Icons are decorative by default (hidden from screen readers). Pass `label` only when the icon stands alone and means something, e.g. a search button with no text. Prefer a visible word.
- Pair an icon with a word wherever there's room. Buttons take `icon` (before) or `iconAfter`.
- Colour: `ink` by default. `signal` is allowed for a single highlighted icon (3:1 on `paper`). Never `ochre` on `paper`.
- Don't: mix in another icon set, use filled icons, use emoji, or scale the stroke (keep sizes between 16 and 32px).
