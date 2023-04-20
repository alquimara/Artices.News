import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }

    }
  }
})
describe('Active Component', () => {
  it('active Link render correctly', () => {
    const { getByText } = render(
      <ActiveLink ActiveClassName='active' href='/'>
        <a>Home</a>
      </ActiveLink>
    )
    expect(getByText('Home')).toBeInTheDocument()
  })
  it('add active class if the link as currently active', () => {
    render(
      <ActiveLink ActiveClassName='active' href='/'>
        <a>Home</a>
      </ActiveLink>
    )
    expect(screen.getByText('Home')).toHaveClass('active')
  })

})

