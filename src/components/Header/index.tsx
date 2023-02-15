import React from 'react'
import styles from './styles.module.scss'
import { SignInButton } from '../SignInButton/index';
import { ActiveLink } from '../ActiveLink';


export function Header() {
  
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContext}>
        <img src="/images/logo2.png" alt='Logo do site'/>
        <nav>
          <ActiveLink ActiveClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink ActiveClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton/>
      </div>
    </header>
  )
}
