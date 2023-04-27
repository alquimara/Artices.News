import React from 'react'
import styles from './styles.module.scss'
import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/strype-js';
import { useRouter } from 'next/router';

export default function SubscribeButton() {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return;
    }
    if (session.activeSubscription) {
      router.push('/posts')
      return

    }

    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data
      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout({ sessionId })

    } catch (err: any) {
      alert(err.message);

    }

  }
  return (
    <button type="button" onClick={handleSubscribe} className={styles.subscribe}>Subscribe now</button>
  )
}

