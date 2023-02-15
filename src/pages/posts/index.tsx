import Head from 'next/head'
import styles from './styles.module.scss'


export default  function Posts (){
  return(
    <>
    <Head>
      <title>Post | Article.News</title>
    </Head>
    <main className={styles.container}>
      <div className={styles.posts}>
        <a>
          <time>14 de fevereiro de 2023</time>
          <strong>Leia Mais</strong>
          <p>ipsum ipsum ipsum ipsum ipsum ipsumipsum ipsumipsum ipsum ipsum ipsum ipsum ipsumvvipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsum</p>
        </a>
        <a>
          <time>14 de fevereiro de 2023</time>
          <strong>Leia Mais</strong>
          <p>ipsum ipsum ipsum ipsum ipsum ipsumipsum ipsumipsum ipsum ipsum ipsum ipsum ipsumvvipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsum</p>
        </a>
        <a>
          <time>14 de fevereiro de 2023</time>
          <strong>Leia Mais</strong>
          <p>ipsum ipsum ipsum ipsum ipsum ipsumipsum ipsumipsum ipsum ipsum ipsum ipsum ipsumvvipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsum</p>
        </a>
        <a>
          <time>14 de fevereiro de 2023</time>
          <strong>Leia Mais</strong>
          <p>ipsum ipsum ipsum ipsum ipsum ipsumipsum ipsumipsum ipsum ipsum ipsum ipsum ipsumvvipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsumipsum ipsum</p>
        </a>
      </div>
    </main>
    </>
  )
}