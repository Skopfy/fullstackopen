import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Test rendering of blog component', () => {
  test('renders content & title', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'example',
      url: 'abc.com',
      likes: 0,
      user: {
        username: 'user',
        id: '6409b3ec84ae8b9a4073f070'
      }
    }
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(blog.user))
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Component testing is done with react-testing-library example')
    const hidden = container.querySelector('.blog_hidden')
    expect(hidden).toHaveStyle('display: none')
  })

  test('clicking the Show Button shows the url and likes element', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'example',
      url: 'abc.com',
      likes: 0,
      user: {
        username: 'user',
        id: '6409b3ec84ae8b9a4073f070'
      }
    }

    const mockHandler = jest.fn()

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(blog.user))
    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('Show')

    button.onclick = mockHandler
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
    const hidden = container.querySelector('.blog_hidden')
    expect(hidden).toHaveTextContent('abc.com likes: 0 Like user')
    expect(hidden).not.toHaveStyle('display: none')
  })
})