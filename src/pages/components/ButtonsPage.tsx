import { Download, Plus, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const variants = ['primary', 'secondary', 'outline', 'ghost', 'soft', 'danger', 'success', 'warning', 'link'] as const
const sizes = ['sm', 'md', 'lg', 'icon'] as const

export function ButtonsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader title={t('nav.components.buttons')} description={t('pages.components.description')} />

      <div className="space-y-[var(--density-gap)]">
        <Card>
          <CardHeader title="Variants" />
          <CardContent className="flex flex-wrap gap-3">
            {variants.map((v) => (
              <Button key={v} variant={v}>{v}</Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Sizes" />
          <CardContent className="flex flex-wrap items-center gap-3">
            {sizes.filter((s) => s !== 'icon').map((s) => (
              <Button key={s} size={s}>Button {s}</Button>
            ))}
            <Button size="icon" aria-label="Add"><Plus className="size-4" /></Button>
            <Button size="icon-sm" variant="outline" aria-label="Download"><Download className="size-4" /></Button>
            <Button size="icon-lg" variant="danger" aria-label="Delete"><Trash2 className="size-4" /></Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="States" />
          <CardContent className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button leftIcon={<Plus className="size-4" />}>With icon</Button>
            <Button rightIcon={<Download className="size-4" />} variant="outline">Export</Button>
            <Button fullWidth>Full width</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ButtonsPage
