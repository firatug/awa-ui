import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { appConfig } from '@/config/app.config'

const sections = [
  { id: 'install', titleKey: 'docs.installation', content: 'install' },
  { id: 'structure', titleKey: 'docs.projectStructure', content: 'structure' },
  { id: 'theming', titleKey: 'docs.theming', content: 'theming' },
  { id: 'tokens', titleKey: 'docs.tokens', content: 'tokens' },
  { id: 'i18n', titleKey: 'docs.i18n', content: 'i18n' },
  { id: 'components', titleKey: 'docs.components', content: 'components' },
  { id: 'faq', titleKey: 'docs.faq', content: 'faq' },
  { id: 'changelog', titleKey: 'docs.changelog', content: 'changelog' },
] as const

export function DocsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader title={t('docs.title')} description={t('docs.subtitle')} />

      <Tabs defaultValue="install" className="space-y-[var(--density-gap)]">
        <TabsList className="flex-wrap h-auto">
          {sections.map((s) => (
            <TabsTrigger key={s.id} value={s.id}>{t(s.titleKey)}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="install">
          <DocSection title={t('docs.installation')} badge={t('app.version')}>
            <pre className="rounded-[var(--radius-lg)] bg-[var(--color-surface-sunken)] p-4 font-mono text-[var(--text-code)] overflow-x-auto">
{`npm install
npm run dev`}
            </pre>
            <p className="mt-4 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
              {t('docs.gettingStartedDescription')}
            </p>
            <ul className="mt-4 list-disc space-y-2 ps-5 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
              <li>React 19 + Vite + TypeScript</li>
              <li>Tailwind CSS v4 with CSS variables</li>
              <li>Radix UI primitives for accessibility</li>
              <li>Central brand config via <code className="font-mono text-[var(--text-code)]">app.config.ts</code></li>
            </ul>
          </DocSection>
        </TabsContent>

        <TabsContent value="structure">
          <DocSection title={t('docs.projectStructure')}>
            <pre className="rounded-[var(--radius-lg)] bg-[var(--color-surface-sunken)] p-4 font-mono text-[var(--text-code)] text-[var(--text-body-sm)]">
{`src/
├── components/   # UI primitives & layout
├── pages/        # Route-level page components
├── config/       # app.config, menu, navigation
├── data/         # Mock data for demos
├── theme/        # Tokens, preferences store
├── locales/      # i18n JSON files
└── features/     # Command palette, customizer`}
            </pre>
            <p className="mt-4 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
              Follow the Implementation Guide: never hardcode brand strings — use <code className="font-mono">appConfig</code> or <code className="font-mono">t()</code> with <code className="font-mono">{'{{appName}}'}</code>.
            </p>
          </DocSection>
        </TabsContent>

        <TabsContent value="theming">
          <DocSection title={t('docs.theming')}>
            <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
              {t('docs.themingDescription')} Use the theme customizer panel to adjust sidebar mode, content width, density, radius, font family, and primary color. Preferences persist via Zustand + localStorage.
            </p>
            <ul className="mt-4 list-disc space-y-2 ps-5 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
              <li>Light / dark / system modes</li>
              <li>CSS variables applied at <code className="font-mono">:root</code></li>
              <li>Density and radius tokens affect all components</li>
            </ul>
          </DocSection>
        </TabsContent>

        <TabsContent value="tokens">
          <DocSection title={t('docs.tokens')}>
            <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
              Design tokens live in <code className="font-mono">theme.ts</code>, <code className="font-mono">theme.css</code>, and <code className="font-mono">design-tokens.json</code>. Use CSS variables like <code className="font-mono">var(--color-primary)</code> and <code className="font-mono">var(--text-body)</code> in components.
            </p>
          </DocSection>
        </TabsContent>

        <TabsContent value="i18n">
          <DocSection title={t('docs.i18n')}>
            <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
              {t('docs.i18nDescription')} Supported locales: {appConfig.supportedLocales.join(', ')}. Default interpolation variables include appName, version, and authorName.
            </p>
          </DocSection>
        </TabsContent>

        <TabsContent value="components">
          <DocSection title={t('docs.components')}>
            <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
              {t('docs.componentsDescription')} Import from <code className="font-mono">@/components/ui</code>. Compose with PageHeader, Card, and layout shells. Charts use Recharts with shared theme from <code className="font-mono">chart-theme.ts</code>.
            </p>
          </DocSection>
        </TabsContent>

        <TabsContent value="faq">
          <DocSection title={t('docs.faq')}>
            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger>How do I change the product name?</AccordionTrigger>
                <AccordionContent>Edit <code className="font-mono">src/config/app.config.ts</code> only. All pages use appConfig or i18n interpolation.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Can I add new pages?</AccordionTrigger>
                <AccordionContent>Create a page in <code className="font-mono">src/pages/</code>, add a route, and register it in menu.config.ts.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>How do auth pages work?</AccordionTrigger>
                <AccordionContent>Auth pages use a centered card layout without admin chrome. The router wraps them in a minimal layout.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </DocSection>
        </TabsContent>

        <TabsContent value="changelog">
          <DocSection title={t('docs.changelog')} badge={appConfig.version}>
            <div className="space-y-4">
              <ChangelogEntry version={appConfig.version} date="2026-07-15" items={[
                'Initial release with 45+ demo pages',
                'Dashboard variants: Overview, Analytics, SaaS, CRM, Projects, Finance',
                'Full design system showcase and component playground',
                'Auth flows with 2FA OTP inputs',
                'TanStack Table advanced demo',
              ]} />
              <ChangelogEntry version="0.9.0" date="2026-06-01" items={[
                'Theme customizer and preferences store',
                'i18n support for EN and TR',
                'Command palette and workspace switcher',
              ]} />
            </div>
          </DocSection>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DocSection({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-[var(--text-h4)] font-semibold">{title}</h2>
          {badge && <Badge variant="outline">{badge}</Badge>}
        </div>
        {children}
      </CardContent>
    </Card>
  )
}

function ChangelogEntry({ version, date, items }: { version: string; date: string; items: string[] }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] p-4">
      <div className="flex items-center gap-3">
        <Badge variant="primary">v{version}</Badge>
        <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">{date}</span>
      </div>
      <ul className="mt-3 list-disc space-y-1 ps-5 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  )
}

export default DocsPage
