## 2025-05-15 - [Accessible Contrast for Helper Text]
**Learning:** Using 'text-ink/70' instead of 'text-ink/40' or 'text-ink/45' ensures sufficient color contrast for secondary text/disclaimers while maintaining the app's aesthetic. Low-opacity Tailwind classes often fail WCAG contrast ratios on slightly colored backgrounds like 'bg-wheat'.
**Action:** Always prefer 'text-ink/70' or higher for readable text elements, especially disclaimers and character counters.
