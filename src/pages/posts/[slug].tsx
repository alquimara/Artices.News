import { getSession } from "next-auth/react";
import Head from "next/head";
import { GetServerSideProps } from "next/types"
import { RichText } from "prismic-dom";
import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss'

interface propsPost {
  Post: {
    slug: string;
    title: string;
    content: string;
    updateAt: string
  }

}

export default function Post({ Post }: propsPost) {
  return (<>
    <Head>
      <title>{Post.title} | Article.News</title>
    </Head>
    <main className={styles.container}>
      <article className={styles.post}>
        <h1>{Post.title}</h1>
        <time>{Post.updateAt}</time>
        <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: Post.content }}>

        </div>
      </article>
    </main>
  </>)


}
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { slug } = params
  console.log(session)
  const prismic = getPrismicClient(req)
  const response = await prismic.getByUID('posts', String(slug), {})

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }

  }
  const Post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
  return {
    props: {
      Post,
    }
  }
}