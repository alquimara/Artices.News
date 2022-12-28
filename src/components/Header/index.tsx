import React from 'react'
import styles from './styles.module.scss'
import { SignInButton } from '../SignInButton/index';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContext}>
        <img src="/images/logo.svg" alt='Logo do site'/>
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>
        <SignInButton/>
      </div>
    </header>
  )
}
