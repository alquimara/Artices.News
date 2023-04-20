import { render, screen, fireEvent } from '@testing-library/react'
import SubscribeButton from './SubscribeButton'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

jest.mock('next-auth/react')
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}))

describe('Subscribe Component', () => {
  it('render correctly button subscribe', () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false] as any)

    render(
      <SubscribeButton />
    )
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })
  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = jest.mocked(signIn)
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false] as any)
    render(
      <SubscribeButton />
    )
    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)
    expect(signInMocked).toHaveBeenCalled()

  })
  it('redirects to posts when user already has a subscribe', () => {
    const useRouterMocked = jest.mocked(useRouter)
    const pushMocked = jest.fn()
    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    const usesessionMocked = jest.mocked(useSession)
    usesessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe', email: 'jonh.doe@gmail.com'
        },
        activeSubscription: 'ativea',
        expires: 'fakepexpires'
      },
    } as any)
    render(
      <SubscribeButton />
    )
    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)
    expect(pushMocked).toHaveBeenCalledWith('/posts')

  })
})
