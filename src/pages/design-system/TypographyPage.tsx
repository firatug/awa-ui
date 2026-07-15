import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { theme } from '@/theme/theme'

const typeScale = [
  { name: 'Display', size: 'text-[var(--text-display)]', weight: 'font-bold', sample: 'Display heading' },
  { name: 'H1', size: 'text-[var(--text-h1)]', weight: 'font-bold', sample: 'Heading level 1' },
  { name: 'H2', size: 'text-[var(--text-h2)]', weight: 'font-semibold', sample: 'Heading level 2' },
  { name: 'H3', size: 'text-[var(--text-h3)]', weight: 'font-semibold', sample: 'Heading level 3' },
  { name: 'H4', size: 'text-[var(--text-h4)]', weight: 'font-semibold', sample: 'Heading level 4' },
  { name: 'H5', size: 'text-[var(--text-h5)]', weight: 'font-medium', sample: 'Heading level 5' },
  { name: 'H6', size: 'text-[var(--text-h6)]', weight: 'font-medium', sample: 'Heading level 6' },
  { name: 'Subtitle', size: 'text-[var(--text-subtitle)]', weight: 'font-medium', sample: 'Subtitle text' },
  { name: 'Body Large', size: 'text-[var(--text-body-lg)]', weight: 'font-normal', sample: 'Large body text for emphasis paragraphs.' },
  { name: 'Body', size: 'text-[var(--text-body)]', weight: 'font-normal', sample: 'Default body text used across the interface.' },
  { name: 'Body Small', size: 'text-[var(--text-body-sm)]', weight: 'font-normal', sample: 'Smaller body text for secondary content.' },
  { name: 'Caption', size: 'text-[var(--text-caption)]', weight: 'font-normal', sample: 'Caption and helper text' },
  { name: 'Label', size: 'text-[var(--text-label)]', weight: 'font-medium', sample: 'Form label' },
  { name: 'Code', size: 'font-mono text-[var(--text-code)]', weight: 'font-normal', sample: 'const theme = "dark"' },
] as const

export function TypographyPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader title={t('pages.typography.title')} description={t('pages.typography.description')} />

      <div className="space-y-[var(--density-gap)]">
        <Card>
          <CardHeader title="Type Scale" description="All typography variants with CSS variables" />
          <CardContent className="divide-y divide-[var(--color-border-subtle)]">
            {typeScale.map((item) => (
              <div key={item.name} className="flex flex-col gap-2 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-32 shrink-0">
                  <p className="text-[var(--text-body-sm)] font-medium text-[var(--color-text-primary)]">{item.name}</p>
                  <p className="font-mono text-[var(--text-caption)] text-[var(--color-text-muted)]">
                    {theme.typography.fontSize[item.name.toLowerCase().replace(' ', '') as keyof typeof theme.typography.fontSize] ?? '—'}
                  </p>
                </div>
                <p className={`${item.size} ${item.weight} text-[var(--color-text-primary)]`}>{item.sample}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
          <Card>
            <CardHeader title="Font Weights" />
            <CardContent className="space-y-3">
              {Object.entries(theme.typography.fontWeight).map(([name, weight]) => (
                <p key={name} style={{ fontWeight: weight }} className="text-[var(--text-h5)]">
                  {name} ({weight}) — {t('app.tagline')}
                </p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Text Colors" />
            <CardContent className="space-y-3">
              <p className="text-[var(--color-text-primary)]">Primary text — main content</p>
              <p className="text-[var(--color-text-secondary)]">Secondary text — descriptions</p>
              <p className="text-[var(--color-text-muted)]">Muted text — placeholders</p>
              <p className="text-[var(--color-primary)]">Brand primary color</p>
              <p className="text-[var(--color-danger)]">Danger / error text</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TypographyPage
