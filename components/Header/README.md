# Header

The header for the studio's own sites: the TWO+THREE lockup on the left, uppercase navigation on the right, a `line` hairline underneath.

- **Provide:** `nav` (a list of `{label, href, current}`), optional `logoHref`, `action` (one small Button or a Menu) and `elevated`.
- The current page gets a 2px `signal` underline. Hover underlines in `ink`.
- Set `elevated` (level 2, `shadow-2`) only when the header is sticky and content is scrolling under it. At the top of the page it sits flat.
- At phone width the navigation wraps under the logo. Keep to five links or fewer.
- On a separate product's or project's site, the header carries the product's icon and name instead of the lockup, and the Logo moves to the footer. Build it from the same classes (`tt-header`, `tt-header-logo`, `tt-header-nav`, `tt-header-link`, `tt-header-action`), set the name in `numeral`, and link it to the top of the page.
- Don't: recolour the logo, put the header on `signal` or `ochre`, or add a second row of links.
