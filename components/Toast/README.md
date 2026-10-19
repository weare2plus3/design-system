# Toast

A short confirmation that floats at the bottom of the screen at elevation 3: `paper` text on an `ink` bar, with an optional action and dismiss button.

- **Provide:** `children` (one short sentence: "Added to your basket."), optional `action` (`{label, onClick}` or `{label, href}`, e.g. "Undo" or "View basket") and `onClose`. The consumer decides when to show it and when to remove it; about five seconds is right, longer if there's an action.
- It's announced politely to screen readers and never steals focus.
- Use for confirming something the person just did. One toast at a time.
- Don't: put errors in a toast (show them next to the thing that failed), or anything the person must act on (use Dialog).
