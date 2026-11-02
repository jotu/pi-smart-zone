# Pi Smart Zone

How the active context size of a Pi session relates to the model's reasoning quality, shown as one of four widget states.

## Language

**Smart zone**:
The range of active context size, below 125,000 tokens, in which a model still reasons sharply.
_Avoid_: safe zone, green zone

**Focus drift**:
The transition range, from 125,000 through 150,000 tokens, in which reasoning quality may start to decline.
_Avoid_: warning zone

**Refocus**:
The state above 150,000 tokens, in which the session should be compacted or restarted.
_Avoid_: overflow, context limit

**Context usage pending**:
The state in which Pi has no current estimate of active context size, such as right after compaction.
_Avoid_: unknown, zero tokens

The thresholds are heuristics, not model context limits.
