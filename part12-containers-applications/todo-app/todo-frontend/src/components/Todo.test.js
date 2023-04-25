import Todo from './Todo'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'


describe('Test rendering of todo component', () => {

    test('renders text', () => {
        const todo = {
          text: "TestTodo",
          done: false
        }
        const doneInfo = jest.fn()
        const notDoneInfo = jest.fn()
        render(<Todo todo={todo} doneInfo={doneInfo} notDoneInfo={notDoneInfo}/>)
        const span = screen.getByText('TestTodo')
        //screen.debug(span)
        expect(span).toBeDefined()
      })

})