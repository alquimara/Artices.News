import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from '../../services/stripe';
import { getSession } from "next-auth/react";

export default async(req: NextApiRequest, res: NextApiResponse) =>{
  if(req.method === "POST"){
    const session = await getSession({req})
    session.user
    const strypeCustomers = await stripe.customers.create({
      email: session?.user?.email,
      metadata:
    })


  



    const StrypecheckoutSession = await stripe.checkout.sessions.create(
      {
        customer:strypeCustomers.id,
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