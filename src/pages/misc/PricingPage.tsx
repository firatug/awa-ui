import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Badge, Button, Card, CardContent, CardFooter, CardHeader } from '@/components/ui'
import { pricingPlans } from '@/data/billing'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

export function PricingPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader
        title={t('pages.pricing.title')}
        description={t('pages.pricing.description')}
      />

      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            padding="lg"
            className={cn(
              'relative flex flex-col',
              plan.popular &&
                'border-[var(--color-primary)] shadow-[var(--shadow-md)] ring-1 ring-[var(--color-primary)]/15',
            )}
          >
            {plan.popular ? (
              <Badge
                variant="primary"
                className="absolute -top-2.5 end-4"
              >
                Popular
              </Badge>
            ) : null}

            <CardHeader
              className="mb-0"
              title={plan.name}
              description={plan.description}
            />

            <CardContent className="flex flex-1 flex-col pt-5">
              <p className="text-[var(--text-h2)] font-bold tracking-tight text-[var(--color-text-primary)]">
                {formatCurrency(plan.price)}
                <span className="ms-1 text-[var(--text-body-sm)] font-normal text-[var(--color-text-muted)]">
                  /{plan.period}
                </span>
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-success-soft)] text-[var(--color-success)]">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto border-0 pt-6">
              <Button
                fullWidth
                variant={plan.popular ? 'primary' : 'outline'}
                asChild
              >
                <Link to="/pages/billing">Get started</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PricingPage
