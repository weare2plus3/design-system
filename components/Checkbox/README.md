# Checkbox

A square 20px box with its label, checked in `signal` with an `ink` tick, inside a 44px-tall hit area.

- **Provide:** `label`, and the usual input attributes (`checked` or `defaultChecked`, `onChange`, `name`, `disabled`).
- The whole label is clickable. Keyboard focus shows the `focus-ring` around the box.
- Use for independent yes/no choices ("Gift wrap this order"). For one choice from a list, use radio buttons; there are none yet.
- Don't: round the box, or use a checkbox for an action that happens immediately (use a Button).
