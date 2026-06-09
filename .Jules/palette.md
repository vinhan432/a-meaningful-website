## 2026-06-09 - Improving Form Accessibility and Feedback

**Learning:** In static, vanilla JavaScript applications using CDN-based Tailwind, accessibility often suffers from missing explicit label associations and low-contrast helper text (e.g., using `text-ink/40`). Additionally, providing real-time character count feedback significantly improves the UX for length-constrained inputs like "mood notes," especially when paired with `aria-live` for screen readers.

**Action:**
1. Always ensure `<label for="ID">` matches the `<input id="ID">`.
2. Use `aria-describedby` to link inputs with their helper/counter text.
3. Use higher opacity for helper text (e.g., `text-ink/70` instead of `text-ink/40`) to meet contrast requirements.
4. Enhance the custom localization engine to support ARIA attributes (like `aria-label`) using a `data-i18n-aria` pattern.
5. Include `aria-live="polite"` on character counters to ensure screen reader users receive updates as they type.
