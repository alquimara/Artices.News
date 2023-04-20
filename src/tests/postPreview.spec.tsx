import { render, screen } from '@testing-library/react'
import PostPreview, { getStaticProps } from '../pages/posts/preview/[slug]';
import { getSession, useSession } from 'next-auth/react';
import { getPrismicClient } from '../services/prismic';
import { useRouter } from 'next/router';


jest.mock('../services/prismic.ts')
jest.mock('next-auth/react')
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}))

const post =
  { slug: 'my-new-post', title: 'My new post', content: '<p>post content</p>', updateAt: '19 de abril de 2023' }

describe('Post Preview Page', () => {
  const useSessionMocked = jest.mocked(useSession)
  useSessionMocked.mockReturnValueOnce([null, false] as any)
  it('renders correctly', () => {
    render(
      <PostPreview Post={post} />
    )
    expect(screen.getByText('My new post')).toBeInTheDocument()
    expect(screen.getByText('post content')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()

  })
  it('redirects user to full post when user is subscribe', async () => {
    const useSessionMocked = jest.mocked(useSession)
    const useRouterMocked = jest.mocked(useRouter)
    const pushFn = jest.fn()
    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: 'fake-active-subscription'
      }
    } as any)
    useRouterMocked.mockReturnValueOnce({
      push: pushFn
    } as any)

    render(
      <PostPreview Post={post} />
    )
    expect(pushFn).toHaveBeenCalledWith("/posts/my-new-post")

  })
  it('loads initial data', async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient)
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My new post' }
          ],
          content: [
            { type: 'paragraph', text: 'post content' }
          ]
        },
        last_publication_date: '04.19.2023'
      })
    } as any)
    const response = await getStaticProps({ params: { slug: 'my-new-post' } } as any)
    console.log(response)
    expect(response).toEqual(expect.objectContaining({
      props: {
        Post: {
          slug: 'my-new-post',
          title: 'My new post',
          content: '<p>post content</p>',
          updateAt: '19 de abril de 2023'
        }
      }

    }))

  })
})