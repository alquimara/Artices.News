import Head from 'next/head'
import styles from './styles.module.scss'
import { getPrismicClient } from '../../services/prismic';
import Prismic from "@prismicio/client";
import { RichText } from 'prismic-dom'
import { GetStaticProps } from 'next/types';
import { text } from 'node:stream/consumers';
import Link from 'next/link'


type post = {
  slug: string,
  title: string,
  excerpt: string,
  updateAt: string
}

interface propPosts {
  posts: post[]

}
export default function Posts({ posts }: propPosts) {
  return (
    <>
      <Head>
        <title>Post | Article.News</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug} legacyBehavior href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updateAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )


}
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.content'],
      pageSize: 100,
    }
  )
  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find((content: { type: string; }) => content.type === 'paragraph')?.text ?? '',
      updateAt: new Date(post.last_publication_date!).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  });

  return {
    props: { posts }
  }
}