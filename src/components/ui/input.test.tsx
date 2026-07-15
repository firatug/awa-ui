import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('associates label with control', () => {
    render(<Input id="email" label="Email" name="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('announces error messages', () => {
    render(<Input id="name" label="Name" error="Required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('supports clearable action', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(
      <Input
        id="search"
        label="Search"
        value="query"
        clearable
        onClear={onClear}
        onChange={() => undefined}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Clear' }))
    expect(onClear).toHaveBeenCalled()
  })
})
