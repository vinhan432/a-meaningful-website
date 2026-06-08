## 2026-06-08 - Enhancing Form Accessibility and Color Contrast

**Learning:** Missing label associations and low-contrast text (like 'text-ink/40') significantly hinder accessibility for screen reader and low-vision users. In a "quiet" app, subtle design shouldn't compromise clarity. Using `aria-live="polite"` for character counters provides non-intrusive feedback.

**Action:** Always verify `<label for="...">` associations for all inputs. Prioritize 'text-ink/70' (or equivalent ~4.5:1 contrast) for any secondary or helper text on light backgrounds. Use ARIA live regions for dynamic counters to keep the experience inclusive.
