import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert } from '@/components/ui/alert'
import { toast } from '@/components/feedback/toast'

const basicSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  role: z.string().min(1, 'Select a role'),
  notify: z.boolean(),
})

type BasicForm = z.infer<typeof basicSchema>

const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  bio: z.string().max(200),
  timezone: z.string(),
  publicProfile: z.boolean(),
})

type ProfileForm = z.infer<typeof profileSchema>

const wizardSchema = z.object({
  company: z.string().min(1),
  teamSize: z.string(),
  plan: z.string(),
  billingEmail: z.string().email(),
  acceptTerms: z.boolean().refine((v) => v === true, 'Required'),
})

type WizardForm = z.infer<typeof wizardSchema>

export function FormsPage() {
  const { t } = useTranslation()
  const [wizardStep, setWizardStep] = useState(0)

  const basicForm = useForm<BasicForm>({
    resolver: zodResolver(basicSchema),
    defaultValues: { name: '', email: '', role: '', notify: true },
  })

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName: 'Sarah', lastName: 'Chen', bio: '', timezone: 'utc', publicProfile: true },
  })

  const wizardForm = useForm<WizardForm>({
    resolver: zodResolver(wizardSchema),
    defaultValues: { company: '', teamSize: '1-10', plan: 'pro', billingEmail: '', acceptTerms: false },
  })

  const onBasicSubmit = basicForm.handleSubmit(() => toast.success(t('form.savedSuccessfully')))
  const onProfileSubmit = profileForm.handleSubmit(() => toast.success(t('form.savedSuccessfully')))
  const onWizardSubmit = wizardForm.handleSubmit(() => {
    toast.success('Workspace created!')
    setWizardStep(0)
  })

  const wizardSteps = ['Company', 'Plan', 'Billing']

  return (
    <div>
      <PageHeader title={t('nav.components.forms')} description={t('docs.formsDescription')} />

      <Tabs defaultValue="basic" className="space-y-[var(--density-gap)]">
        <TabsList>
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="wizard">Multi-step</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader title="Basic Form" description="react-hook-form + zod validation" />
            <form onSubmit={onBasicSubmit}>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <Input label="Name" {...basicForm.register('name')} error={basicForm.formState.errors.name?.message} />
                <Input label={t('auth.email')} type="email" {...basicForm.register('email')} error={basicForm.formState.errors.email?.message} />
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[var(--text-label)] font-medium">Role</label>
                  <Select value={basicForm.watch('role')} onValueChange={(v) => basicForm.setValue('role', v)}>
                    <SelectTrigger><SelectValue placeholder={t('form.selectOption')} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Checkbox
                  label="Send email notifications"
                  checked={basicForm.watch('notify')}
                  onCheckedChange={(v) => basicForm.setValue('notify', !!v)}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit">{t('actions.save')}</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader title="Profile Form" />
            <form onSubmit={onProfileSubmit}>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <Input label="First name" {...profileForm.register('firstName')} />
                <Input label="Last name" {...profileForm.register('lastName')} />
                <div className="md:col-span-2">
                  <Textarea label="Bio" {...profileForm.register('bio')} rows={3} />
                </div>
                <Switch
                  label="Public profile"
                  checked={profileForm.watch('publicProfile')}
                  onCheckedChange={(v) => profileForm.setValue('publicProfile', v)}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit">{t('actions.save')}</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="wizard">
          <Card>
            <CardHeader title="Setup Wizard" description={`Step ${wizardStep + 1} of ${wizardSteps.length}`} />
            <div className="mb-4 flex gap-2 px-5">
              {wizardSteps.map((step, i) => (
                <div
                  key={step}
                  className={`flex-1 rounded-[var(--radius-control)] py-2 text-center text-[var(--text-caption)] font-medium ${
                    i <= wizardStep ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]' : 'bg-[var(--color-surface-sunken)] text-[var(--color-text-muted)]'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <form onSubmit={onWizardSubmit}>
              <CardContent className="space-y-4">
                {wizardStep === 0 && (
                  <>
                    <Input label="Company name" {...wizardForm.register('company')} />
                    <Select value={wizardForm.watch('teamSize')} onValueChange={(v) => wizardForm.setValue('teamSize', v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1–10</SelectItem>
                        <SelectItem value="11-50">11–50</SelectItem>
                        <SelectItem value="51+">51+</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}
                {wizardStep === 1 && (
                  <Select value={wizardForm.watch('plan')} onValueChange={(v) => wizardForm.setValue('plan', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {wizardStep === 2 && (
                  <>
                    <Input label="Billing email" type="email" {...wizardForm.register('billingEmail')} />
                    <Checkbox label="I accept the terms of service" checked={wizardForm.watch('acceptTerms')} onCheckedChange={(v) => wizardForm.setValue('acceptTerms', !!v)} />
                    <Alert variant="info">You will be charged after the trial period ends.</Alert>
                  </>
                )}
              </CardContent>
              <CardFooter className="justify-between">
                <Button type="button" variant="outline" disabled={wizardStep === 0} onClick={() => setWizardStep((s) => s - 1)}>
                  {t('actions.previous')}
                </Button>
                {wizardStep < wizardSteps.length - 1 ? (
                  <Button type="button" onClick={() => setWizardStep((s) => s + 1)}>{t('actions.next')}</Button>
                ) : (
                  <Button type="submit">{t('actions.submit')}</Button>
                )}
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FormsPage
