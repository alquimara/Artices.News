import { render, screen } from '@testing-library/react'
import { SignInButton } from '.'
import { useSession } from 'next-auth/react'


jest.mock('next-auth/react')

describe('SignButton Component', () => {
  it('render correctly when user is not authenticated', () => {
    const usesessionMocked = jest.mocked(useSession)
    usesessionMocked.mockReturnValueOnce([false, null] as any)
    render(
      <SignInButton />
    )
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('render correctly when user is authenticated', () => {
    const usesessionMocked = jest.mocked(useSession)
    usesessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe', email: 'jonh.doe@gmail.com'
        },
        expires: 'fakepexpires'
      },
    } as any)

    render(
      <SignInButton />
    )
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
