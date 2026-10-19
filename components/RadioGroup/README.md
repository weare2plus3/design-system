# RadioGroup

A labelled set of round options where exactly one can be picked, filled `signal` with an `on-signal` dot when chosen.

- **Provide:** `legend` (the question), `options` (strings, or `{value, label, disabled}`), and either `defaultValue` or `value` with `onChange(value)`. `name` is generated if you leave it out.
- Use for two to five choices that should all be visible: delivery speed, paper finish. More than five, use Select.
- Radios are the one round control in the system, so they read instantly as "pick one".
- Don't: start with nothing selected when there's a sensible default, or use radios for independent yes/no choices (use Checkbox).
