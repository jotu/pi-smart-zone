# Triage Labels

Triage state is recorded as a `Status:` line near the top of each ticket file under `.scratch/`.

| Canonical role | Status value | Meaning |
| --- | --- | --- |
| `needs-triage` | `needs-triage` | The issue has not yet been assessed or routed. |
| `needs-info` | `needs-info` | More information is needed before the issue can be assessed or acted on. |
| `ready-for-agent` | `ready-for-agent` | The issue is sufficiently clear and scoped for an agent to work on. |
| `ready-for-human` | `ready-for-human` | The issue needs human judgment, action, or ownership. |
| `wontfix` | `wontfix` | The project has decided not to address the issue. |

Use only the status that describes the issue's current state, and replace it when the state changes. Do not invent additional triage statuses without agreement.
