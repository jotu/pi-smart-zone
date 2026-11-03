---
status: accepted
---

# Use fixed, absolute token thresholds

The widget classifies context usage with two fixed token counts (125,000 and 150,000) rather than a percentage of the model's context window or per-model configuration. The thresholds are a heuristic about reasoning quality, which does not scale linearly with window size: a 1M-token window is no "smarter" at 500k tokens than a 200k window at 125k. Fixed values keep the labels predictable and the extension free of configuration.

**Considered options:** percentage of the context window (rejected: misleads on very large windows); user-configurable thresholds (deferred: add only if real demand appears).

**Consequences:** the labels may be too optimistic or pessimistic for some models. The README and glossary state that the thresholds are heuristics, not model limits.
