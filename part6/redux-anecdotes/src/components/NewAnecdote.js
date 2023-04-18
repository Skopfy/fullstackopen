import { useDispatch } from 'react-redux'
import { createAnecdote, sort } from '../reducers/anecdoteReducer'
import { notificationAdd, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(sort())
        dispatch(notificationAdd("Successfully added an anecdote!"))
        setTimeout(() => { dispatch(notificationRemove()) }, 5000)
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm