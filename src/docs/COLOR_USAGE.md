# Color usage rules

1. Use semantic tokens only (`--color-primary`, `--color-danger`, …).
2. Prefer soft backgrounds (`--color-*-soft`) for chips and status surfaces.
3. Dark mode uses graphite surfaces (`--color-canvas`, `--color-surface`, `--color-surface-raised`) — never pure black or inverted light tokens.
4. Status meaning must not rely on color alone — pair with icons or labels.
5. Charts: use series from `getChartColors().series` — max 5–6 hues.
