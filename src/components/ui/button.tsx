import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,opacity,transform] duration-[var(--duration-base)] ease-[var(--easing-standard)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] select-none rounded-[var(--radius-button)]',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-primary)] !text-white hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] shadow-[var(--shadow-button)]',
        secondary:
          'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)] shadow-[var(--shadow-button)]',
        outline:
          'border border-[var(--color-border-strong)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-sunken)]',
        ghost:
          'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)]',
        soft: 'bg-[var(--color-primary-soft)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-sunken)]',
        danger:
          'bg-[var(--color-danger)] text-white hover:opacity-90 shadow-[var(--shadow-button)]',
        success:
          'bg-[var(--color-success)] text-white hover:opacity-90 shadow-[var(--shadow-button)]',
        warning:
          'bg-[var(--color-warning)] text-white hover:opacity-90 shadow-[var(--shadow-button)]',
        link: 'bg-transparent text-[var(--color-text-primary)] underline-offset-4 hover:underline px-0 h-auto font-medium shadow-none rounded-none',
      },
      size: {
        sm: 'h-[var(--control-h-sm)] px-3.5 text-[var(--text-body-sm)]',
        md: 'h-[var(--control-h-md)] px-5 text-[var(--text-body)]',
        lg: 'h-[var(--control-h-lg)] px-6 text-[var(--text-body)]',
        icon: 'size-[var(--control-h-md)]',
        'icon-sm': 'size-[var(--control-h-sm)]',
        'icon-lg': 'size-[var(--control-h-lg)]',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading
    const classes = cn(buttonVariants({ variant, size, fullWidth }), className)

    // Radix Slot requires a single element child — never wrap icons around it
    if (asChild) {
      return (
        <Comp
          className={classes}
          ref={ref}
          aria-busy={loading || undefined}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        className={classes}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-[var(--icon-sm)] animate-spin" aria-hidden />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { buttonVariants }
