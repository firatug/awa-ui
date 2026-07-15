import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert } from '@/components/ui/alert'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export function PlaygroundPage() {
  const { t } = useTranslation()
  const [btnVariant, setBtnVariant] = useState<string>('primary')
  const [btnSize, setBtnSize] = useState<string>('md')
  const [btnLoading, setBtnLoading] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [inputSize, setInputSize] = useState<string>('md')
  const [inputError, setInputError] = useState(false)
  const [cardPadding, setCardPadding] = useState<string>('md')
  const [badgeVariant, setBadgeVariant] = useState<string>('primary')
  const [alertVariant, setAlertVariant] = useState<string>('info')

  return (
    <div>
      <PageHeader title={t('pages.playground.title')} description={t('pages.playground.description')} />

      <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
        <Card>
          <CardHeader title="Controls" />
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-[var(--text-label)]">Button variant</label>
              <Select value={btnVariant} onValueChange={setBtnVariant}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['primary', 'secondary', 'outline', 'ghost', 'danger'].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-[var(--text-label)]">Button size</label>
              <Select value={btnSize} onValueChange={setBtnSize}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['sm', 'md', 'lg'].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Switch label="Loading" checked={btnLoading} onCheckedChange={setBtnLoading} />
            <Switch label="Disabled" checked={btnDisabled} onCheckedChange={setBtnDisabled} />
            <div>
              <label className="mb-1 block text-[var(--text-label)]">Input size</label>
              <Select value={inputSize} onValueChange={setInputSize}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['sm', 'md', 'lg'].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Switch label="Input error" checked={inputError} onCheckedChange={setInputError} />
            <div>
              <label className="mb-1 block text-[var(--text-label)]">Card padding</label>
              <Select value={cardPadding} onValueChange={setCardPadding}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['none', 'sm', 'md', 'lg'].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-[var(--text-label)]">Badge variant</label>
              <Select value={badgeVariant} onValueChange={setBadgeVariant}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['default', 'primary', 'success', 'warning', 'danger'].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-[var(--text-label)]">Alert variant</label>
              <Select value={alertVariant} onValueChange={setAlertVariant}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['info', 'success', 'warning', 'danger'].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card padding={cardPadding as 'none' | 'sm' | 'md' | 'lg'}>
          <CardHeader title="Preview" />
          <CardContent className="space-y-4">
            <Button
              variant={btnVariant as 'primary'}
              size={btnSize as 'md'}
              loading={btnLoading}
              disabled={btnDisabled}
            >
              Preview Button
            </Button>
            <Input
              label="Preview Input"
              placeholder="Type something…"
              inputSize={inputSize as 'md'}
              error={inputError ? 'Error message' : undefined}
            />
            <Badge variant={badgeVariant as 'primary'}>Preview Badge</Badge>
            <Alert variant={alertVariant as 'info'} title="Preview Alert">
              Adjust controls on the left to see live changes.
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PlaygroundPage
