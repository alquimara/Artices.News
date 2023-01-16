import React from 'react'
import styles from  './styles.module.scss'
import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import {getStripeJs} from '../../services/strype-js';


interface SubscribeProps{
  priceId:string;
}

export default function SubscribeButton({priceId}:SubscribeProps){
  const { data: session } = useSession();

  async function handleSubscribe(){
    if(!session){
      signIn('github')
      return;
    }

    try {
      const response  = await api.post('/subscribe')
      const{sessionId} = response.data
      const stripe  = await getStripeJs();
      await stripe.redirectToCheckout({sessionId})
      
    } catch (err) {
      alert(err.message);
      
    }

  }
  return (
    <button type="button" onClick={handleSubscribe} className={styles.subscribe}>Subscribe now</button>
  )
}

