import { cn } from '@/lib/utils'
import './sidebar-hide.css'

export interface NavMenuButtonProps {
  active?: boolean
  rotating?: boolean
  disabled?: boolean
  onClick?: () => void
  'aria-label'?: string
  className?: string
  id?: string
}

/** Pleasure/MCM 6-patty hamburger — closed / hover / X / spin */
export function NavMenuButton({
  active = false,
  rotating = false,
  disabled = false,
  onClick,
  className,
  id,
  'aria-label': ariaLabel,
}: NavMenuButtonProps) {
  return (
    <button
      type="button"
      id={id}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={active}
      className={cn(
        'awa-nav-menu',
        active && 'is-active',
        rotating && 'is-rotating',
        className,
      )}
    >
      <span className="awa-nav-menu-scale">
        <span className="hamburger">
          <span className="patty" />
          <span className="patty" />
          <span className="patty" />
          <span className="patty" />
          <span className="patty" />
          <span className="patty" />
        </span>
      </span>
    </button>
  )
}
