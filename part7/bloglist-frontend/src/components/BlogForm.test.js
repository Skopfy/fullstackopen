import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const input_title = container.querySelector('#title-input')
  const input_author = container.querySelector('#author-input')
  const input_url = container.querySelector('#url-input')
  const sendButton = screen.getByText('save')

  await user.type(input_title, 'example title')
  await user.type(input_author, 'example author')
  await user.type(input_url, 'abc.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toMatchObject({
    title: 'example title',
    author: 'example author',
    url: 'abc.com'
  })
})
