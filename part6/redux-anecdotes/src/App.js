import AnecdoteForm from "./components/NewAnecdote"
import AnecdoteList from "./components/Anecdotes"
import Filter from "./components/AnecdoteFilter"

const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App