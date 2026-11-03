---
status: accepted
---

# Render as a widget above the editor, not in the footer or status bar

The status uses `ctx.ui.setWidget(..., { placement: "aboveEditor" })`. Footer and status entries are shared with, or fully replaced by, other extensions and themes, so the label could be hidden or overwritten. A dedicated widget stays visible regardless of footer customization, at the cost of one extra line of vertical space.

In print and JSON modes (`ctx.hasUI` is false) nothing is rendered.
