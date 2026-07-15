# AWA UI — Universal Admin Design System

Modern, minimal, premium React admin template and design system for SaaS, CRM, ERP, multi-tenant products, and more.

**Version:** 1.0.0  
**Stack:** React 19 · TypeScript · Vite · Tailwind CSS 4 · Radix UI · Recharts · TanStack Table · Zustand · i18next

## Demo credentials

| Field    | Value            |
|----------|------------------|
| Email    | admin@awa-ui.dev |
| Password | demo1234         |

## Quick start

```bash
npm install
npm run dev
```

### Scripts

| Command              | Description                |
|----------------------|----------------------------|
| `npm run dev`        | Start development server   |
| `npm run build`      | Production build           |
| `npm run preview`    | Preview production build   |
| `npm run test`       | Run unit tests             |
| `npm run lint`       | Lint source files          |

## Brand customization

Edit a single file: [`src/config/app.config.ts`](src/config/app.config.ts)

```ts
export const appConfig = {
  name: 'AWA UI',
  shortName: 'AWA',
  tagline: 'Universal Admin Design System',
  version: '1.0.0',
  // ...
}
```

Do **not** hardcode product names in components. Use `appConfig` or i18n `{{appName}}`.

Replace logos in `/public`:

- `logo.svg`
- `logo-mark.svg`
- `favicon.svg`

## Theming

- CSS tokens: `src/theme/theme.css`
- TypeScript theme: `src/theme/theme.ts`
- JSON tokens: `src/tokens/design-tokens.json`
- Live customizer: settings gear in the demo (persists to `localStorage`)

Supports light / dark / system modes, primary color, sidebar modes, density, radius, fonts, RTL, and reduced motion.

## Internationalization

Locales: English (`en`), Turkish (`tr`)

- Files: `src/locales/en/common.json`, `src/locales/tr/common.json`
- Switch language from the header or preferences store

## Project structure

```
src/
  app/           # Router
  components/    # UI, layout, forms, charts, data-display
  config/        # Brand & menu configuration
  data/          # Mock data
  docs/          # Implementation guides
  features/      # Theme customizer, command palette
  locales/       # i18n
  pages/         # Demo pages & templates
  theme/         # Theme provider & tokens
  tokens/        # design-tokens.json
```

## Documentation

Open **Documentation** in the sidebar, or read:

- [`src/docs/IMPLEMENTATION_GUIDE.md`](src/docs/IMPLEMENTATION_GUIDE.md) — rules for AI tools & teams
- [`CHANGELOG.md`](CHANGELOG.md)
- [`CREDITS.md`](CREDITS.md)
- [`LICENSE.md`](LICENSE.md)

## Features

- Design system + admin template in one package
- Extensive component library with playground
- Powerful data tables (TanStack Table)
- Six dashboard demos
- Auth, settings, users/roles, apps (kanban, chat, inbox, calendar…)
- Live theme customizer
- Light & dark modes
- EN / TR + RTL-ready
- Accessible Radix primitives with AWA visual styling
- Exportable design tokens

## License

See [`LICENSE.md`](LICENSE.md). ThemeForest / regular license terms apply when purchased.
