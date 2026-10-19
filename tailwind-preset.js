/** TWO+THREE Tailwind preset — generated from tokens.json.
 * Use with tokens.css loaded (colours and shadows are CSS variables, so light/dark switch automatically).
 * In tailwind.config.js:  presets: [require("./design-system/tailwind-preset.js")]
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        "paper": "var(--paper)",
        "paper-raised": "var(--paper-raised)",
        "ink": "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "line": "var(--line)",
        "signal": "var(--signal)",
        "signal-text": "var(--signal-text)",
        "on-signal": "var(--on-signal)",
        "ochre": "var(--ochre)",
        "focus-ring": "var(--focus-ring)",
        "danger": "var(--danger)",
        "scrim": "var(--scrim)"
      },
      spacing: {"1": "4px", "2": "8px", "3": "12px", "4": "16px", "6": "24px", "8": "32px", "12": "48px", "16": "64px"},
      borderRadius: {"none": "0px", "sm": "4px", "pill": "999px"},
      boxShadow: {"0": "var(--shadow-0)", "1": "var(--shadow-1)", "2": "var(--shadow-2)", "3": "var(--shadow-3)", "4": "var(--shadow-4)"},
      fontFamily: {"display": ["Teko", "Arial Narrow", "sans-serif"], "sans": ["Instrument Sans", "system-ui", "-apple-system", "Segoe UI", "sans-serif"], "mono": ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"]},
    },
  },
};
