## 2025-05-14 - Synchronizing UI Labels with State
**Learning:** In interactive components like the breathing exercise, updating the internal state (rhythm) without reflecting the label change in the UI (e.g., '4-4-8') creates a disconnected user experience where the user is unsure if their selection was successful.
**Action:** Always ensure that any state-changing interaction (like clicking a preset) triggers a corresponding UI refresh for all related labels and indicators.

## 2025-05-14 - Accessible Character Counters
**Learning:** Character counters are most effective for accessibility when associated with their inputs via `aria-describedby` and wrapped in an `aria-live="polite"` container. This ensures screen reader users are aware of the constraints and their current progress.
**Action:** Use a consistent pattern for character counters: `<div aria-live="polite"><span id="input-id-desc"><span id="input-id-count">0</span>/140</span></div>` and link it to the input.
