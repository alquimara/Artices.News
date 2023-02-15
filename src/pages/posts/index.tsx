import Head from 'next/head'
import styles from './styles.module.scss'
import { getPrismicClient } from '../../services/prismic';
import Prismic from "@prismicio/client";
import { GetStaticProps } from 'next/types';


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
export const getStaticProps: GetStaticProps = async ()=>{
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at('document.type','posts')],
    {
      fetch:['posts.title', 'posts.content'],
      pageSize:100,
    }
  )
  console.log(response);

  return {
    props:{}
  }
}