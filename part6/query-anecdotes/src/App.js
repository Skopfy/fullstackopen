import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {

    const queryClient = useQueryClient()
    const updateAnecdoteMutation = useMutation(updateAnecdote, {
        onSuccess: () => {
          queryClient.invalidateQueries('anecdotes')
        },
      })
    const handleVote = (anecdote) => {
        console.log('vote')
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    }

    var anecdotes = [
        {
            "content": "If it hurts, do it more often",
            "id": "47145",
            "votes": 0
        },
    ]

    const result = useQuery(
        'anecdotes', getAnecdotes,
        {
            retry: false
        }
    )
    if (result.isLoading) {
        return (
            <div>
                loading data...
            </div>
        )
    } else if (result.isError) {
        return (
            <div>
                anecdote service not available due to problems on the server side
            </div>
        )
    }
    anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
