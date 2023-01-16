import React from 'react'
import styles from  './styles.module.scss'
import { useSession, signIn } from 'next-auth/react';
interface SubscribeProps{
  priceId:string;
}

export default function SubscribeButton({priceId}:SubscribeProps){
  const [session] = useSession();

  function handleSubscribe(){
    if(!session){
      signIn('github')
      return;
    }

  }
  return (
    <button type="button" onClick={handleSubscribe} className={styles.subscribe}>Subscribe now</button>
  )
}

