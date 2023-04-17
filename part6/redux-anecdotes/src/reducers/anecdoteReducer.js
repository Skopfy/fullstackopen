const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

function compareVotes(a, b) {
    if (a.votes < b.votes) {
      return 1;
    }
    if (a.votes > b.votes) {
      return -1;
    }
    return 0;
  }
  

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'VOTE':
            const id = action.payload.id
            const anecdoteToChange = state.find(n => n.id === id)
            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }
            return state.map(note =>
                note.id !== id ? note : changedAnecdote
            )
        case 'NEW_ANECDOTE':
            return [...state, action.payload]
        case 'SORT':
            const newState = state.sort(compareVotes)
            return newState
        default:
            return state
    }


}

export const vote = (id) => {
    return {
        type: 'VOTE',
        payload: { id }
    }
}

export const createAnecdote = (anecdote) => {
    return {
        type: 'NEW_ANECDOTE',
        payload: {
            content: anecdote,
            id: getId(),
            votes: 0
        }
    }
}

export const sort = () => {
    return {
        type: 'SORT',
        payload: {}
    }
}


export default reducer