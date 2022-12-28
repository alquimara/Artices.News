import React from 'react'
import styles from  './styles.module.scss'
interface SubscribeProps{
  priceId:string;
}

export default function SubscribeButton({priceId}:SubscribeProps){
  return (
    <button type="button" className={styles.subscribe}>Subscribe now</button>
  )
}

