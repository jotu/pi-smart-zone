---
status: accepted
---

# Show advice only; never compact or reset the session

At the **Refocus** state the widget suggests `/compact` or `/new`, but the extension never runs either. Compacting and starting a new session discard information the user may still need, so that decision stays with the user. Pi's own auto-compaction already covers the hard context limit; this extension only surfaces quality drift before it.
