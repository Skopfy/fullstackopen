import AnecdoteForm from "./components/NewAnecdote"
import AnecdoteList from "./components/Anecdotes"
import Notification from "./components/Notification"
import Filter from "./components/AnecdoteFilter"

const App = () => {
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