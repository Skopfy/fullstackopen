import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import NotificationContext from '../notificationContext'

const AnecdoteForm = () => {
    const [notification, dispatch] = useContext(NotificationContext)
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation(createAnecdote, {
        onSuccess: () => { queryClient.invalidateQueries('anecdotes') },
        onError: (error, variables, context) => {
            dispatch({ type: 'SET', payload: error.response.data.error })
            setTimeout(() => { dispatch({ type: 'REMOVE' }) }, 5000)
        },
    })


    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('new anecdote')
        newAnecdoteMutation.mutate({ content, votes: 0 })
        dispatch({ type: 'SET', payload: 'New Anecdote created!' })
        setTimeout(() => { dispatch({ type: 'REMOVE' }) }, 5000)
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
