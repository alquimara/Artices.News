import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from '../../../services/prismic';
import styles from '../post.module.scss'
import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect } from "react";

interface propsPostPreview{
  Post:{
    slug:string;
    title:string;
    content:string;
    updateAt: string
  }
  
}

export default function PostPreview({Post}:propsPostPreview){
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(()=>{
    if(session?.activeSubscription){
      router.push(`/posts/${Post.slug}`)

    }
  },[session])
  return(<>
  <Head>
    <title>{Post.title} | Article.News</title>
  </Head>
  <main className={styles.container}>
    <article className={styles.post}>
      <h1>{Post.title}</h1>
      <time>{Post.updateAt}</time>
      <div className={`${styles.postContent} ${styles.previewContent}`} dangerouslySetInnerHTML={{__html:Post.content}}>

      </div>
      <div className={styles.continueReading}>
        Wanna continue reading? 
        <Link legacyBehavior href="/">
        <a href="">
          Subscribe now 🤗

        </a>
        </Link>
      
      </div>
    </article>
  </main>
  </>)


}
export const getStaticPaths:GetStaticPaths = async()=>{
  return {
    paths:[],
    fallback:'blocking'
}}
export const getStaticProps:GetStaticProps = async({params}) =>{
 
  const {slug}= params
  const prismic = getPrismicClient()
  const response = await prismic.getByUID('posts',String(slug),{})
  
  const Post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0,3)),
    updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',{
      day:'2-digit',
      month:'long',
      year:'numeric'
    })
  }
  return {
    props:{
      Post,
    },
    redirect:60*30 // atualizar o post de 30 a 30 minutes
  }
}
