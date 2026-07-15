import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Alert } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Spinner } from '@/components/ui/spinner'
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from '@/components/ui/modal'
import { toast } from '@/components/feedback/toast'
import { RevenueAreaChart } from '@/components/charts/ChartCards'
import { revenueChartData } from '@/data/dashboard'
import { theme, colors } from '@/theme/theme'
import { spacing, radii, shadows } from '@/theme/theme'

export function DesignSystemPage() {
  const { t } = useTranslation()

  const semanticColors = [
    { name: 'Primary', var: '--color-primary', hex: colors.light.primary },
    { name: 'Secondary', var: '--color-secondary', hex: colors.light.secondary },
    { name: 'Success', var: '--color-success', hex: colors.light.success },
    { name: 'Warning', var: '--color-warning', hex: colors.light.warning },
    { name: 'Danger', var: '--color-danger', hex: colors.light.danger },
    { name: 'Info', var: '--color-info', hex: colors.light.info },
  ]

  return (
    <div>
      <PageHeader
        title={t('nav.designSystem.root')}
        description={t('pages.components.description')}
      />

      <div className="space-y-[var(--density-gap)]">
        <Card>
          <CardHeader title="Colors" description={t('pages.colors.description')} />
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {semanticColors.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div
                    className="size-12 rounded-[var(--radius-lg)] border border-[var(--color-border)]"
                    style={{ backgroundColor: `var(${c.var})` }}
                  />
                  <div>
                    <p className="text-[var(--text-body-sm)] font-medium">{c.name}</p>
                    <p className="font-mono text-[var(--text-caption)] text-[var(--color-text-muted)]">
                      {c.var}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Typography" />
          <CardContent className="space-y-4">
            <p style={{ fontSize: theme.typography.fontSize.display }} className="font-bold">Display</p>
            <p style={{ fontSize: theme.typography.fontSize.h1 }} className="font-bold">Heading 1</p>
            <p style={{ fontSize: theme.typography.fontSize.h2 }} className="font-semibold">Heading 2</p>
            <p style={{ fontSize: theme.typography.fontSize.h3 }} className="font-semibold">Heading 3</p>
            <p style={{ fontSize: theme.typography.fontSize.body }}>Body text — {t('app.description')}</p>
            <p style={{ fontSize: theme.typography.fontSize.caption }} className="text-[var(--color-text-muted)]">Caption text</p>
          </CardContent>
        </Card>

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-3">
          <Card>
            <CardHeader title="Spacing" />
            <CardContent className="space-y-2">
              {Object.entries(spacing).slice(1, 8).map(([k, v]) => (
                <div key={k} className="flex items-center gap-3">
                  <div className="h-4 bg-[var(--color-primary)]" style={{ width: v }} />
                  <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">{k}: {v}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Radius" />
            <CardContent className="grid grid-cols-3 gap-3">
              {Object.entries(radii).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center gap-2">
                  <div
                    className="size-12 border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)]"
                    style={{ borderRadius: v }}
                  />
                  <span className="text-[var(--text-caption)]">{k}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Shadows" />
            <CardContent className="space-y-4">
              {Object.entries(shadows).filter(([k]) => k !== 'focus').map(([k]) => (
                <div
                  key={k}
                  className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-4"
                  style={{ boxShadow: `var(--shadow-${k})` }}
                >
                  <span className="text-[var(--text-body-sm)]">shadow-{k}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader title="Buttons" />
          <CardContent className="flex flex-wrap gap-2">
            {(['primary', 'secondary', 'outline', 'ghost', 'soft', 'danger', 'success', 'warning', 'link'] as const).map((v) => (
              <Button key={v} variant={v}>{v}</Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Forms" />
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Input label="Email" placeholder="you@company.com" />
            <Input label="With error" error="This field is required" />
            <Input label="With success" success="Looks good!" />
            <Input label="Disabled" disabled value="Read only value" />
          </CardContent>
        </Card>

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
          <Card>
            <CardHeader title="Badges" />
            <CardContent className="flex flex-wrap gap-2">
              {(['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'outline'] as const).map((v) => (
                <Badge key={v} variant={v}>{v}</Badge>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Alerts" />
            <CardContent className="space-y-3">
              <Alert variant="info" title="Info">Informational message.</Alert>
              <Alert variant="success" title="Success">Operation completed.</Alert>
              <Alert variant="warning" title="Warning">Please review before continuing.</Alert>
              <Alert variant="danger" title="Error">Something went wrong.</Alert>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-3">
          <Card>
            <CardHeader title="Modal" />
            <CardContent>
              <Modal>
                <ModalTrigger asChild>
                  <Button>Open modal</Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Confirm action</ModalTitle>
                    <ModalDescription>This is a sample modal dialog.</ModalDescription>
                  </ModalHeader>
                  <ModalFooter>
                    <ModalClose asChild><Button variant="outline">{t('actions.cancel')}</Button></ModalClose>
                    <Button>{t('actions.confirm')}</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Toast" />
            <CardContent className="space-y-2">
              <Button variant="outline" onClick={() => toast.success('Saved successfully')}>Success toast</Button>
              <Button variant="outline" onClick={() => toast.error('Something failed')}>Error toast</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Loading" />
            <CardContent className="flex items-center gap-4">
              <Spinner />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader title="Empty State" />
          <CardContent>
            <EmptyState
              title={t('empty.defaultTitle')}
              description={t('empty.defaultDescription')}
              action={<Button size="sm">{t('actions.create')}</Button>}
            />
          </CardContent>
        </Card>

        <RevenueAreaChart data={revenueChartData} title="Chart Styles" />
      </div>
    </div>
  )
}

export default DesignSystemPage
