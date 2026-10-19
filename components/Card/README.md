# Card

A square-cornered `paper-raised` panel with a `line` border holding optional media, an eyebrow, a title, body text and a footer; flat at elevation 0 unless it floats.

- **Provide:** any of `media` (an image, edge to edge), `eyebrow` (short label line), `title`, `children` (one or two sentences), `footer` (a quiet Button or link). Set `href` to make the whole card a link.
- **Elevation:** `elevation` picks `shadow-0` to `shadow-4`. Cards sit at 0 on the page. A linked or `interactive` card lifts to level 2 on hover. Use 1 only when a card sits over a busy background, and leave 3 and 4 to menus and dialogs.
- Lay cards in a wrapping row with `space-8` gaps; they stretch to equal height.
- Don't: nest cards, put more than one primary Button in a card, or add coloured side borders.
