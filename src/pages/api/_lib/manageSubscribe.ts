import { fauna } from '../../../services/fauna';
import {query as qry} from 'faunadb'
import { stripe } from "../../../services/stripe"

export async function saveSubscription(subscriptionId:string,customeId: string,createdAction=false){

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
    userId: userRef,
    status:subscription.status,
    price_id:subscription.items.data[0].price.id
  }
  if(createdAction){
    await fauna.query(qry.Create(
      qry.Collection('subscriptions'),
    {data: subscriptionData}
    ))

  }else{
    await fauna.query(
      qry.Replace(
        qry.Select(
          "ref",
          qry.Get(
            qry.Match(
              qry.Index('subscription_by_id'),
              subscriptionId

            )
          )
        ),
        {data:subscriptionData}
      )
      
    )
    
  

  }

}