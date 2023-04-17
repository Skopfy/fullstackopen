import AnecdoteForm from "./components/NewAnecdote"
import AnecdoteList from "./components/Anecdotes"

const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App