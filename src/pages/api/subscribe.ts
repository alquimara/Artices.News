/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from '../../services/stripe';
import { getSession } from "next-auth/react";
import {fauna } from '../../services/fauna';
import {query as qry} from 'faunadb'

type User={
  ref:{
    id: string
  },
  data:{
    stripe_custome_id: string
  }

}


export default async(req: NextApiRequest, res: NextApiResponse) =>{
  if(req.method === "POST"){
    const session = await getSession({req})


    const user = await fauna.query<User>(
      qry.Get(
        qry.Match(
          qry.Index('user_by_email'),
          qry.Casefold(session.user.email)
        )

      )
    )

    let custormeID = user.data.stripe_customer_id;
    if(!custormeID){
      const strypeCustomers = await stripe.customers.create({
        email: session?.user?.email
      })
      await fauna.query<User>(
        qry.Update(
          qry.Ref(qry.Collection('users'),user.ref.id),{
            data:{
              stripe_customer_id: strypeCustomers.id
            }
          }
        )
      )

      custormeID = strypeCustomers.id

    }
    const StrypecheckoutSession = await stripe.checkout.sessions.create(
      {
        customer:custormeID,
        payment_method_types:['card'],
        billing_address_collection:'required',
        line_items:[
          {price:'price_1MK0yZIUylgxzSY3uc6TqRJy', quantity: 1}

        ],
        mode:'subscription',
        allow_promotion_codes:true,
        success_url:process.env.STRYPE_SUCESS_URL,
        cancel_url:process.env.STRYPE_CANCEL_URL
      }
    )
    return res.status(200).json({sessionId: StrypecheckoutSession.id})

  }
  else{
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')

  }

}