## 2026-06-13 - [Accessibility: Label Association and Color Contrast]
**Learning:** The application had systemic issues with missing 'for' attributes on labels and insufficient color contrast (e.g., text-ink/45) for small helper text and character counters.
**Action:** Always ensure labels are associated with inputs using 'for' and 'id' pairs. Use at least 'text-ink/70' (or equivalent opacity) for small text to maintain WCAG-compliant contrast ratios against the 'paper' or 'wheat' backgrounds.

## 2026-06-13 - [Interaction: Character Counters]
**Learning:** Character counters provide immediate feedback for limited-length inputs but must be consistently implemented in both HTML (with ARIA live regions) and JavaScript (including reset logic).
**Action:** When adding character counters, include `aria-live="polite"` and `aria-describedby` on the input. Ensure the counter resets to 0 in JavaScript when the input is cleared or the interaction is cancelled.
