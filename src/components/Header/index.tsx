import React from 'react'
import styles from './styles.module.scss'
import { SignInButton } from '../SignInButton/index';
import Link from 'next/link';


export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContext}>
        <img src="/images/logo2.png" alt='Logo do site'/>
        <nav>
          <Link legacyBehavior href="/">
            <a className={styles.active}>Home</a>
          </Link>
          <Link legacyBehavior href="/posts" prefetch>
            <a>Posts</a>
          </Link>
        </nav>
        <SignInButton/>
      </div>
    </header>
  )
}
