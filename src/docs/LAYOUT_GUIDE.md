# Page layout guide

1. Authenticated pages live inside `AppShell`.
2. Start every page with `PageHeader` (title, description, actions).
3. Prefer CSS grid with `gap-[var(--density-gap)]`.
4. Content width follows preferences (`ContentContainer`).
5. Auth and marketing-style pages stay outside the shell (`/auth/*`).
6. Design mobile navigation via drawer — never shrink-only desktop chrome.
