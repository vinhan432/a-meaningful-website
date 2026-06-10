## 2025-05-14 - Accessible Form Labels and Character Counters

**Learning:** Interactive forms in a relaxation app must be highly accessible and provide clear, high-contrast feedback to avoid user frustration. Using `aria-describedby` for character counters and ensuring `aria-live="polite"` helps screen reader users understand constraints without being interrupted.

**Action:** Always associate labels with inputs using `for` and `id`, and provide real-time character count feedback with sufficient color contrast (e.g., `text-ink/70` instead of `text-ink/40`).
