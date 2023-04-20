import { render, screen } from '@testing-library/react'
import Post, { getServerSideProps } from '../pages/posts/[slug]';
import { getSession, useSession } from 'next-auth/react';
import { getPrismicClient } from '../services/prismic';


jest.mock('../services/prismic.ts')
jest.mock('next-auth/react')

const post =
  { slug: 'my-new-post', title: 'My new post', content: '<p>post content</p>', updateAt: '19 de abril de 2023' }

describe('Post Page', () => {
  it('renders correctly', () => {
    render(
      <Post Post={post} />
    )
    expect(screen.getByText('My new post')).toBeInTheDocument()
    expect(screen.getByText('post content')).toBeInTheDocument()

  })
  it('redirects user if no subscribe is found', async () => {
    const getSessionMocked = jest.mocked(getSession)
    getSessionMocked.mockResolvedValueOnce(null)
    const getPrismicClientMocked = jest.mocked(getPrismicClient)
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({})
    } as any)
    const response = await getServerSideProps({ params: { slug: 'my-new-post' } } as any)
    expect(response).toEqual(expect.objectContaining({
      redirect: expect.objectContaining({
        destination: '/'
      })
    }))
  })
  it('loads initial data', async () => {
    const getsessionMocked = jest.mocked(getSession)
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
    getsessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active'
    } as any)
    const response = await getServerSideProps({ params: { slug: 'my-new-post' } } as any)
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