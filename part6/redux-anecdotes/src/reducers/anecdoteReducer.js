import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

function compareVotes(a, b) {
    if (a.votes < b.votes) {
        return 1;
    }
    if (a.votes > b.votes) {
        return -1;
    }
    return 0;
}

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        updateAnecdote(state, action) {
            const id = action.payload.id
            const changedAnecdote = {
                ...action.payload
            }
            return state.map(note =>
                note.id !== id ? note : changedAnecdote
            )
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        sort(state, action) {
           //// console.log('state now: ', JSON.parse(JSON.stringify(state)))
            //console.log('action', action)
            const newState = state.sort(compareVotes)
            return newState
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
        dispatch(sort())
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
        dispatch(sort())
    }
}

export const vote = anecdote => {
    return async dispatch => {
        const votedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        const newAnecdote = await anecdoteService.update(votedAnecdote)
        dispatch(updateAnecdote(newAnecdote))
        dispatch(sort())
    }
}

export const { appendAnecdote, sort, setAnecdotes, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer