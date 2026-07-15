import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { Children, forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return `${parts[0]![0] ?? ''}${parts[parts.length - 1]![0] ?? ''}`.toUpperCase()
}

export interface AvatarProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'size-8 text-[var(--text-caption)]',
  md: 'size-10 text-[var(--text-body-sm)]',
  lg: 'size-12 text-[var(--text-body)]',
  xl: 'size-16 text-[var(--text-h6)]',
}

export const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, src, alt, name, size = 'md', ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-full)] border border-[var(--color-border)] bg-[var(--color-surface-sunken)] font-medium text-[var(--color-text-secondary)]',
      sizeClasses[size],
      className,
    )}
    {...props}
  >
    <AvatarPrimitive.Image
      src={src}
      alt={alt ?? name}
      className="aspect-square size-full object-cover"
    />
    <AvatarPrimitive.Fallback
      delayMs={300}
      className="flex size-full items-center justify-center bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
    >
      {name ? getInitials(name) : '?'}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number
  size?: AvatarProps['size']
}

export function AvatarGroup({
  className,
  children,
  max,
  size = 'md',
  ...props
}: AvatarGroupProps) {
  const childArray = Children.toArray(children)
  const visible = max ? childArray.slice(0, max) : childArray
  const overflow = max ? Math.max(childArray.length - max, 0) : 0

  return (
    <div
      className={cn('flex items-center -space-x-2', className)}
      {...props}
    >
      {visible.map((child, index) => (
        <div
          key={index}
          className="ring-2 ring-[var(--color-surface)] rounded-[var(--radius-full)]"
        >
          {child}
        </div>
      ))}
      {overflow > 0 ? (
        <div
          className={cn(
            'relative flex shrink-0 items-center justify-center rounded-[var(--radius-full)] border border-[var(--color-border)] bg-[var(--color-surface-sunken)] font-medium text-[var(--color-text-secondary)] ring-2 ring-[var(--color-surface)]',
            sizeClasses[size],
          )}
        >
          +{overflow}
        </div>
      ) : null}
    </div>
  )
}
