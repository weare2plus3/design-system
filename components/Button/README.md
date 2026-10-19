# Button

The one button: square corners and an uppercase `label`-style caption in three variants, with primary in `signal` at most once per view.

- **Provide:** `children` (the caption, verb first: "See the work", "Subscribe"), optional `variant`, `size`, `icon` or `iconAfter` (an Icon name), and `href` to render a link that looks like a button. Any other button attribute (`onClick`, `disabled`, `type`) passes through.
- **primary:** `signal` fill with `on-signal` text. Use it for the one thing the page is for. On hover it turns `ink`.
- **secondary:** 1.5px `ink` outline. Use it for the second action beside a primary.
- **quiet:** underlined text. Use it for minor actions and card footers.
- **sm** (36px) is for dense rows only. The default is 48px, so every button is a comfortable touch target.
- Icons: `iconAfter: 'arrow-right'` for "go somewhere", `icon` for a leading symbol. Never an icon that just repeats the caption.
- Don't: put two primaries side by side, use sentence-long captions, or round the corners.
