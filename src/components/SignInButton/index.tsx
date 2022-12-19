import React from 'react'
import styles from './styles.module.scss'
import {FaGithub} from 'react-icons/fa'
import{FiX} from 'react-icons/fi'
export function SignInButton(){
  const isUserLoggin = true;
  return isUserLoggin ? (
    <button className={styles.signInButton} type="button">
      <FaGithub color='#04d361'/>
      Alquimara Alves
      <FiX color="#737380" className={styles.closeIcon}/>
      
      </button>
  ):
  <button className={styles.signInButton} type="button">
  <FaGithub color='#eba417'/>

  Sign in with Github</button>

}
