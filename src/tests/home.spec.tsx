import { render, screen } from '@testing-library/react'
import Home, { getStaticProps } from '../pages/index';
import { useRouter } from 'next/router';
import { stripe } from '../services/stripe';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        path: '/'
      }
    }
  }
})
jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})
jest.mock('../services/stripe.ts')
describe('Home Page', () => {
  it('renders correctly', () => {
    render(
      <Home product={{
        priceId: 'price-test',
        amount: 'R$10,00'
      }} />
    )
    expect(screen.getByText('for R$10,00 month')).toBeInTheDocument()

  })
  it('loads initial data', async () => {
    const retrivePriceStripeMocked = jest.mocked(stripe.prices.retrieve)
    retrivePriceStripeMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000
    } as any)
    const response = await getStaticProps({})
    console.log(response)
    expect(response).toEqual(expect.objectContaining({
      props: {
        product: {
          priceId: 'fake-price-id',
          amount: '$10.00'
        }
      }
    }))

  })
})