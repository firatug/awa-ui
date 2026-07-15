import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

export function NavigationPage() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [step, setStep] = useState(1)
  const totalPages = 5
  const steps = ['Account', 'Profile', 'Preferences', 'Review']

  return (
    <div>
      <PageHeader title={t('nav.components.navigation')} description={t('pages.components.description')} />

      <div className="space-y-[var(--density-gap)]">
        <Card>
          <CardHeader title="Tabs" />
          <CardContent>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Details</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-4 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
                Tab content for overview section.
              </TabsContent>
              <TabsContent value="tab2" className="mt-4 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
                Tab content for details section.
              </TabsContent>
              <TabsContent value="tab3" className="mt-4 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
                Tab content for settings section.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Breadcrumbs" />
          <CardContent>
            <Breadcrumbs
              items={[
                { label: t('nav.groups.components'), href: '/components/buttons' },
                { label: t('nav.components.navigation') },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Pagination" />
          <CardContent className="flex items-center justify-between">
            <span className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
              {t('table.page')} {page} {t('table.of')} {totalPages}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                {t('actions.previous')}
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                {t('actions.next')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Stepper" description={`Step ${step} of ${steps.length}`} />
          <CardContent>
            <div className="mb-6 flex items-center">
              {steps.map((s, i) => (
                <div key={s} className="flex flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => setStep(i + 1)}
                    className={`flex size-8 items-center justify-center rounded-[var(--radius-full)] text-[var(--text-caption)] font-semibold ${
                      i + 1 <= step
                        ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                        : 'bg-[var(--color-surface-sunken)] text-[var(--color-text-muted)]'
                    }`}
                  >
                    {i + 1}
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`mx-2 h-0.5 flex-1 ${i + 1 < step ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}`} />
                  )}
                </div>
              ))}
            </div>
            <p className="mb-4 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
              Current step: <strong>{steps[step - 1]}</strong>
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>{t('actions.previous')}</Button>
              <Button size="sm" disabled={step === steps.length} onClick={() => setStep((s) => s + 1)}>{t('actions.next')}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default NavigationPage
