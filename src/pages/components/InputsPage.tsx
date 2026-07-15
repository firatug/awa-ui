import { Search, Mail } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioItem } from '@/components/ui/radio'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'

export function InputsPage() {
  const { t } = useTranslation()
  const [value, setValue] = useState('Sample text')

  return (
    <div>
      <PageHeader title={t('nav.components.inputs')} description={t('pages.components.description')} />

      <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
        <Card>
          <CardHeader title="Text Inputs" />
          <CardContent className="space-y-4">
            <Input label="Default" placeholder="Enter text…" />
            <Input label="With icon" leftAddon={<Mail className="size-4" />} placeholder="email@example.com" />
            <Input label="Search" leftAddon={<Search className="size-4" />} placeholder={t('actions.search')} />
            <Input
              label="Clearable"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              clearable
              onClear={() => setValue('')}
            />
            <Input label="Error state" error={t('form.invalidEmail')} />
            <Input label="Success state" success="Valid input" />
            <Input label="Disabled" disabled value="Cannot edit" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Sizes" />
          <CardContent className="space-y-4">
            <Input label="Small" inputSize="sm" placeholder="Small input" />
            <Input label="Medium" inputSize="md" placeholder="Medium input" />
            <Input label="Large" inputSize="lg" placeholder="Large input" />
            <Textarea label="Textarea" placeholder="Write something…" rows={4} />
            <Textarea label="Auto-resize" autoResize minRows={2} maxRows={6} placeholder="Grows with content…" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Selection" />
          <CardContent className="space-y-4">
            <Select>
              <SelectTrigger><SelectValue placeholder={t('form.selectOption')} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
                <SelectItem value="b">Option B</SelectItem>
                <SelectItem value="c">Option C</SelectItem>
              </SelectContent>
            </Select>
            <Checkbox label="Checkbox option" defaultChecked />
            <RadioGroup defaultValue="a">
              <RadioItem value="a" label="Radio A" />
              <RadioItem value="b" label="Radio B" />
              <RadioItem value="c" label="Radio C" />
            </RadioGroup>
            <Switch label="Toggle switch" defaultChecked />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Slider" />
          <CardContent>
            <Slider defaultValue={[50]} max={100} step={1} />
            <p className="mt-4 text-[var(--text-caption)] text-[var(--color-text-muted)]">
              Drag to adjust value from 0 to 100
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default InputsPage
