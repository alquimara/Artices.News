import { render, screen } from '@testing-library/react'
import Posts, { getStaticProps } from '../pages/posts';
import { getPrismicClient } from '../services/prismic'

jest.mock('../services/prismic.ts')

const posts = [
  { slug: 'my-new-posts', title: 'My new posts', excerpt: 'posts excerpt', updateAt: '19 de abril de 2023' }
]
describe('Posts Page', () => {
  it('renders correctly', () => {
    render(
      <Posts posts={posts} />
    )
    expect(screen.getByText('My new posts')).toBeInTheDocument()

  })
  it('loads initial data', async () => {
    const prismicMocked = jest.mocked(getPrismicClient)
    prismicMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-posts',
            data: {
              title: [
                { type: 'heading', text: 'My new posts' }
              ],
              content: [
                { type: 'paragraph', text: 'posts excerpt' }
              ]
            },
            last_publication_date: '04.19.2023'
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})
    console.log(response)
    expect(response).toEqual(expect.objectContaining({
      props: {
        posts: [
          {
            slug: 'my-new-posts',
            title: 'My new posts',
            excerpt: 'posts excerpt',
            updateAt: '19 de abril de 2023'
          }
        ]
      }
    }))

  })
})