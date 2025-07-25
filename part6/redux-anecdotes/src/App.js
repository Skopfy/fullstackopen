import AnecdoteForm from "./components/NewAnecdote"
import AnecdoteList from "./components/Anecdotes"
import Notification from "./components/Notification"
import Filter from "./components/AnecdoteFilter"
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'


const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App