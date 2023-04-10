import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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
  })
})