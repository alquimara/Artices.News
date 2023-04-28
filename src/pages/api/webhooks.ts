import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream'
import Stripe from 'stripe';
import { stripe } from '../../services/stripe';
import { saveSubscription } from './_lib/manageSubscribe';


type Secret = string | string[] | Buffer

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);

}
export const config = {
  api: {
    bodyParser: false
  }
}
const relevantEvents = new Set(['checkout.session.completed', 'customer.subscription.updated', 'customer.subscription.deleted'])

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    const buf = await buffer(req)
    const header: any = req.headers['stripe-signature']
    const secret: Secret = header
    let event: Stripe.Event;
    try {
      const webhooksSecrets: any = process.env.STRYPE_WEBHOOKS_SECRET
      event = stripe.webhooks.constructEvent(buf, secret, webhooksSecrets)
    } catch (error: any) {
      return res.status(400).send(`Webhook error: ${error.message}`);
    }
    const { type } = event;
    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription(subscription.id, subscription.customer.toString(), false);
            break

          case 'checkout.session.completed':

            const checkoutSession = event.data.object as Stripe.Checkout.Session
            const subscriptionsave: any = checkoutSession.subscription?.toString()
            const checkoutsessionCustomer: any = checkoutSession.customer?.toString()

            await saveSubscription(subscriptionsave, checkoutsessionCustomer, true)
            break;

          default:
            throw new Error("Unhandled event.")
            break;
        }

      } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Webhook handler failed." });

      }

    }
    res.json({ received: true })
  }
  else {
    res.setHeader('allow', 'POST');
    res.status(405).end('Method not allowed')
  }


}