# AWA UI Implementation Guide

Use this guide when building new screens with AI assistants (Cursor, Copilot, etc.) or human developers.

## Brand

- Product name, logo, version, and author live in `src/config/app.config.ts` only.
- Never hardcode brand strings. Import `appConfig` or use i18n `{{appName}}`.

## Tokens first

- Colors, spacing, radius, shadows, control heights → CSS variables (`var(--color-primary)`, `var(--space-4)`, `var(--radius-lg)`).
- Do **not** invent new hex colors or ad-hoc pixel spacing in components.
- Light and dark modes have **separate** surface scales — never “invert” light colors.

## Spacing & radius

- Use the 4px spacing scale (`--space-*`).
- Keep card / control radius on `--radius-*` tokens. Change radius globally via theme customizer / `[data-radius]`, not per component.

## Forms & controls

- Control heights: `--control-h-sm|md|lg`. Do not invent custom heights.
- Always connect `<label>` ↔ control (`htmlFor` / `id`).
- Include loading, disabled, error, empty, and success states where interactive.

## Components

- Prefer existing primitives from `@/components/ui`.
- Match existing prop APIs (`variant`, `size`, `fullWidth`, `loading`, `disabled`).
- Use Radix only for behavior/a11y; visuals stay AWA-specific.

## Layout

- Use `AppShell`, `PageHeader`, `ContentContainer`.
- Design mobile layouts deliberately — do not only shrink desktop.

## Charts & tables

- Use shared chart theme (`@/components/charts`) and DataTable modules.
- Avoid rainbow palettes; stick to primary / secondary / neutral / status tokens.

## i18n & RTL

- User-facing copy belongs in `src/locales/{en,tr}/common.json`.
- Support `dir="rtl"`; use logical properties (`start`/`end`, `ms`/`me`) where possible.

## Motion

- Transitions 150–220ms (`--duration-base`).
- Honor `data-reduced-motion="true"` / prefers-reduced-motion.

## Checklist for every new page

1. Tokens only (no hard-coded colors)
2. Loading / empty / error / disabled coverage
3. Labels & keyboard access
4. Mobile layout considered
5. Strings from locales
6. Brand from `appConfig`
