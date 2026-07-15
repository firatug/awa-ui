import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { appConfig } from '@/config/app.config'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'
import { cn } from '@/lib/utils'

interface Workspace {
  id: string
  name: string
  plan: string
  initials: string
}

const workspaces: Workspace[] = [
  { id: 'default', name: `${appConfig.shortName} Studio`, plan: 'Pro', initials: 'AS' },
  { id: 'acme', name: 'Acme Corp', plan: 'Enterprise', initials: 'AC' },
  { id: 'startup', name: 'Startup Labs', plan: 'Team', initials: 'SL' },
]

export interface WorkspaceSwitcherProps {
  collapsed?: boolean
  className?: string
}

export function WorkspaceSwitcher({ collapsed = false, className }: WorkspaceSwitcherProps) {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState(workspaces[0]!.id)
  const active = workspaces.find((w) => w.id === activeId) ?? workspaces[0]!

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'h-auto w-full justify-start gap-3 px-2 py-2 hover:bg-[var(--color-surface-sunken)]',
            collapsed && 'justify-center px-0',
            className,
          )}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--text-body-sm)] font-semibold text-[var(--color-primary)]">
            {active.initials}
          </span>
          {!collapsed ? (
            <>
              <span className="flex min-w-0 flex-1 flex-col items-start text-start">
                <span className="w-full truncate text-[var(--text-body-sm)] font-medium text-[var(--color-text-primary)]">
                  {active.name}
                </span>
                <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
                  {active.plan}
                </span>
              </span>
              <ChevronsUpDown className="size-[var(--icon-sm)] shrink-0 text-[var(--color-text-muted)]" />
            </>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>{t('sidebar.workspaces')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => setActiveId(workspace.id)}
            className="gap-3"
          >
            <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--text-caption)] font-semibold text-[var(--color-primary)]">
              {workspace.initials}
            </span>
            <span className="flex flex-1 flex-col">
              <span className="text-[var(--text-body-sm)] font-medium">{workspace.name}</span>
              <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
                {workspace.plan}
              </span>
            </span>
            {workspace.id === activeId ? (
              <Check className="size-[var(--icon-sm)] text-[var(--color-primary)]" />
            ) : null}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <Plus className="size-[var(--icon-sm)]" />
          {t('sidebar.createWorkspace')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
