TWO+THREE is a small creative studio that publishes books and builds software, alongside culture, gifts and design work. The brand is **bold but refined**: squared, heavy headings and one sage accent, held in check by a lot of space and quiet, square structure. Think independent publisher crossed with a well-made dev tool.

## Voice

- Short and declarative. The tagline sets the rhythm: "software. culture. gifts. books. design."
- Write as "we", speak to "you". Plain words, no hype, no exclamation marks, no emoji.
- One idea per line. If a headline needs a comma, it's probably two headlines.
- Casing has three rules. Big headlines (`display`) are lowercase sentences: "we make things worth keeping." Short statements, numbers and stamps (`display-xl`, `numeral`) are UPPERCASE, four words or fewer. Card and dialog headings (`heading`) are sentence case.
- The name has interchangeable forms: **TWO+THREE** (the logo, headings, signage), **2plus3** (running text, handles and URLs, e.g. 2plus3.studio) and **2+3** (short references). The legal name, TWO PLUS THREE LIMITED, is for legal and financial documents only. Pick one form per piece and stick to it.

## Colour

- Ground is `paper`; content sits on `paper-raised`. Set text in `ink`, secondary text in `ink-muted`.
- `signal` is the studio colour, a soft sage. Use it once per view: a primary button, the logo's +, a highlight. Text on it is always `on-signal` (ink), never white. It holds 3:1 on `paper`, so it also works for outlines, underlines and icons, but it's too light for text: coloured words and links use `signal-text`.
- `ochre` is the second accent, warm and earthy, for book covers, gifts and seasonal moments. Fills only, with `on-signal` text. Never put `ochre` and `signal` side by side at the same size.
- `danger` is for form errors only, always with a written message.
- `line` is for hairline dividers only. Controls get an `ink` border.
- Both themes are first-class. Dark mode is the default on the web; print and books work in light.

## Type

- Two typefaces, both Google Fonts: **Teko** (`display`, 500–600) for every heading, and **Instrument Sans** (`sans`, 400–600) for everything you read. Code uses the device's own monospace (`code`); there's nothing to load for it.
- Teko is the logo's voice: its squared, narrow letters match the TWO+THREE wordmark. Use `display-xl` for one uppercase hero statement, `display` for lowercase section headlines, `heading` for cards and dialogs, `numeral` for numbers, prices and volume labels.
- Teko is never used for paragraphs or anything longer than about eight words. Body copy is `body` or `body-lg`; eyebrows, buttons, tags and navigation are `label` (Instrument Sans, uppercase).
- Set headings tight (leading under 1). Keep body copy loose.

## Space, shape and layout

- Spacing is a 4px scale: `space-1` 4, `space-2` 8, `space-3` 12, `space-4` 16, `space-6` 24, `space-8` 32, `space-12` 48, `space-16` 64. Use only these steps. Separate page sections with `space-16`; when in doubt, add space rather than lines.
- Corners are square (`radius-none`) for blocks, cards, images and buttons. `radius-sm` is only for text inputs; `radius-pill` only for tags and radio buttons.
- No gradients. Separate things with space, a `line` hairline or a change from `paper` to `paper-raised`.
- Build with type and hairlines, with colour as small solid accents. Structure comes from 1px `line` rules and `ink` outlines; colour arrives in small, deliberate solid pieces (the logo's +, a primary button, a tag, a book cover in `ochre`), never as large decorative washes. Asymmetry is good.

## Elevation

- The page is flat: everything sits at level 0 (`shadow-0`) by default. Shadows are only for things that rise above the page.
- `shadow-1`: a card resting over a busy background, a selected tile.
- `shadow-2`: an interactive card on hover, and the sticky header once content scrolls under it.
- `shadow-3`: menus, dropdowns, popovers and toasts.
- `shadow-4`: dialogs and sheets, always over the `scrim`. One per screen.
- Never use elevation for decoration, and never put a shadow on a sage or ochre fill. In dark mode, shadows are deeper but less visible, so keep the `line` border on raised things.

## States

- Focus: a 2px solid `focus-ring` (ink) ring, offset 2px, in both themes.
- Hover on a primary button: swap to an `ink` fill with `paper` text. Disabled: `line` fill with `ink-muted` text.
- Errors: `danger` text and a 2px `danger` border, always with a written message starting "!".

## Components

- The components live in `components/bundle.js` as `window.TwoPlusThree` and need React 18 on the page, plus `tokens.css` and `components/bundle.css`.
- Actions: **Button**. Brand: **Logo**, **Icon**. Forms: **TextField**, **TextArea**, **Select**, **Checkbox**, **RadioGroup**. Content: **Tag**, **Card**. Overlays: **Menu**, **Toast**, **Dialog**. Navigation: **Header**. Each has its own guidelines; read them before use.
- Use the components rather than restyling raw HTML, so focus rings, sizes and states stay consistent.

## Logo

- The logo is the **TWO+THREE** lockup in the `Logos` group: a square mark with a white 2 and 3 stepping up and a solid `signal` + where they meet, beside the wordmark set in Teko on two lines (TWO+ / THREE) with its + also in `signal`. Use `two-plus-three-lockup.svg` on light grounds, `-reversed` on dark, and `-mono` wherever `signal` can't be printed. Use the mark alone where space is square or tiny. In code, use the Logo component.
- The wordmark is Teko outlined into shapes. Always use the files or the component, never retype it in the live font.
- The logo is the brand's one heavy, solid object, and its two +s are the brand's one fixed use of `signal`. Everything around it stays type and hairlines; that heavy-against-hairline contrast is the brand's signature.

## Iconography

- Use the studio's own set through the Icon component: 21 line icons on a 24-unit grid, 1.5 stroke, square ends, drawn in the surrounding text colour.
- Pair icons with words wherever there's room. Never use emoji as icons, filled icons, or icons from another set.

## Illustration: Hairline

- All illustration is in the Hairline style (made with the `hairline-create` skill, `/hairline-create <idea>` in Claude Code): one isometric line figure built from rounded solids in a single stroke, in a 400 × 320 viewBox at the 2:1 camera.
- No fills, gradients, glows or shadows. Plates are filled only with the ground colour so near solids hide far ones.
- Map Hairline's colours to ours: ground → `paper`, ink → `ink`, muted → `ink-muted`, line → `line`, and the one bright highlight stroke → `signal`. Don't give a figure colours of its own; it changes theme with the page.
- Never put words, digits or icons inside a figure. Names go in the small read-out beside it, set in `code`.
- Use figures for empty states, feature headers and book or product explainers. One figure per view, one idea per figure, and its resting pose has to work as a still image.
- Hairline figures are the brand's pictures. Don't mix in photo-style or flat-colour illustration.
