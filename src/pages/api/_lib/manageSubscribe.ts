import { fauna } from "../../../services/fauna"
import {query as qry} from 'faunadb'
import { stripe } from "../../../services/stripe"
import { Console } from "console"

export async function saveSubscription(subscriptionId:string,customeId: string){

  const userRef = await fauna.query(
    qry.Select(
      "ref",
      qry.Get(
        qry.Match(
          qry.Index('user_by_stripe_customer_id'),
          customeId
        )
      )
    )
  )


  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData= {
    id: subscription.id,
    UserId: userRef,
    status:subscription.status,
    price_id:subscription.items.data[0].price.id
  }

  await fauna.query(qry.Create(
    qry.Collection('subscriptions'),
  {data: subscriptionData}
  ))

}