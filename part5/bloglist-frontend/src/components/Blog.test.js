import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Test rendering of blog component', () => {
  test('renders content', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      url: 'abc.com',
      likes: 0,
      user: {
        username: 'user',
        id: '6409b3ec84ae8b9a4073f070'
      }
    }
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(blog.user))
    render(<Blog blog={blog} />)

    screen.debug()

    const element = screen.getByText('Component testing is done with react-testing-library')
    screen.debug(element)
    expect(element).toBeDefined()
  })
})