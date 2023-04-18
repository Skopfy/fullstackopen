import { useSelector, useDispatch } from 'react-redux'
import { vote, sort } from '../reducers/anecdoteReducer'
import { notificationAdd, notificationRemove } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <li>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes} votes
                <button onClick={handleClick}>Vote</button>
            </div>
        </li>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const anecdoteFilter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    return (
        <ul>
            {
                anecdotes
                    .filter(anecdote => anecdote.content.includes(anecdoteFilter))
                    .map(anecdote =>
                        <Anecdote
                            key={anecdote.id}
                            anecdote={anecdote}
                            handleClick={() => {
                                dispatch(vote(anecdote.id))
                                dispatch(sort())
                                dispatch(notificationAdd(`Successfully voted on anecdote "${anecdote.content}"!`))
                                setTimeout(() => { dispatch(notificationRemove()) }, 5000)
                            }
                            }
                        />
                    )
            }
        </ul>
    )
}

export default AnecdoteList