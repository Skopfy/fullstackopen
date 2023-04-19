import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationAddAndRemove } from '../reducers/notificationReducer'

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
                                dispatch(vote(anecdote))
                                const msg = `Successfully voted on anecdote "${anecdote.content}"!`
                                dispatch(notificationAddAndRemove(msg, 1))
                            }
                            }
                        />
                    )
            }
        </ul>
    )
}

export default AnecdoteList