import { Folder, FileText, Image, Sheet, Upload, Grid, List } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fileItems } from '@/data/apps'
import type { FileItem } from '@/data/apps'
import { cn } from '@/lib/utils'

const iconMap = {
  folder: Folder,
  pdf: FileText,
  image: Image,
  doc: FileText,
  sheet: Sheet,
}

export function FileManagerPage() {
  const { t } = useTranslation()
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div>
      <PageHeader
        title={t('pages.fileManager.title')}
        description={t('pages.fileManager.description')}
        actions={<Button size="sm" leftIcon={<Upload className="size-4" />}>{t('actions.upload')}</Button>}
      />

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <Input placeholder={t('actions.search')} className="max-w-sm" />
            <div className="flex gap-1">
              <Button variant={view === 'grid' ? 'soft' : 'ghost'} size="icon-sm" onClick={() => setView('grid')} aria-label="Grid view">
                <Grid className="size-4" />
              </Button>
              <Button variant={view === 'list' ? 'soft' : 'ghost'} size="icon-sm" onClick={() => setView('list')} aria-label="List view">
                <List className="size-4" />
              </Button>
            </div>
          </div>

          {view === 'grid' ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {fileItems.map((file) => (
                <FileCard key={file.id} file={file} />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {fileItems.map((file) => {
                const Icon = iconMap[file.type]
                return (
                  <div key={file.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                    <Icon className="size-5 text-[var(--color-primary)]" />
                    <span className="flex-1 text-[var(--text-body-sm)] font-medium">{file.name}</span>
                    <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">{file.size ?? '—'}</span>
                    <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">{file.modified}</span>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function FileCard({ file }: { file: FileItem }) {
  const Icon = iconMap[file.type]
  return (
    <button
      type="button"
      className={cn(
        'flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4 text-center transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-sunken)]',
      )}
    >
      <Icon className="size-8 text-[var(--color-primary)]" />
      <span className="truncate text-[var(--text-body-sm)] font-medium w-full">{file.name}</span>
      <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">{file.modified}</span>
    </button>
  )
}

export default FileManagerPage
