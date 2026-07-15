# Component usage guide

Import from barrels when possible:

```tsx
import { Button, Input, Card, Modal } from '@/components/ui'
import { DataTable, KpiCard } from '@/components/data-display'
import { AreaChartCard, LineChartCard } from '@/components/charts'
```

## Conventions

| Concern | Pattern |
|---------|---------|
| Variants | `variant="primary" \| "outline" \| …` |
| Size | `size="sm" \| "md" \| "lg"` |
| Loading | `loading` boolean |
| Width | `fullWidth` |
| Icons | `leftIcon` / `rightIcon` |

Compose complex UI from primitives rather than one-off styled divs. Prefer CSS variables over Tailwind color utilities that bypass tokens.
