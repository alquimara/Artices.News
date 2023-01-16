import {loadStripe} from '@stripe/stripe-js'

export async function getStripeJs(){
  const stripeJs = loadStripe(process.env.NEXT_PUBLIC_STRYPE_PUBLIC_KEY!)
  return stripeJs;
}