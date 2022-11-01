import { useState } from 'react'

const Anecdote = (props) => {
    const randomNumber = () => Math.floor(Math.random() * props.nQuotes)
    const randomQuote = () => props.setSelected(randomNumber())
     
    const Vote = () => {
	const copy = { ...props.votes }
	copy[props.selected] += 1
	props.setVotes(copy)
	const i = argmax(copy)
	props.setPopular(i)
    }

    //Taken from: https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
    const argmax = copy => {
	const arr = Object.values(copy)
	if (arr.length === 0) {
            return -1
	}

	var max = arr[0]
	var maxIndex = 0	
	for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
		maxIndex = i
		max = arr[i]
            }
	}
	return maxIndex;
    }
    
  return (
	  <>
	  <h1>Anecdote of the day</h1>
	  <p>Randomly selected no: {props.selected}</p>
	  <p> {props.anecdotes[props.selected]} </p>
	  <p> Votes: {props.votes[props.selected]} </p>
	  <Button onClick={Vote} text={"vote"} />
	  <Button onClick={randomQuote} text={"next anecdote"} />
	  <h1>Most popular anecdote</h1>
	  <p> {props.anecdotes[props.popular]} </p>
	  <p> Votes: {props.votes[props.popular]} </p>
	  </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
    const [popular, setPopular] = useState(0)

  return (
	  <div>
	  < Anecdote anecdotes={anecdotes} selected={selected} setSelected={setSelected} nQuotes={anecdotes.length} votes={votes} setVotes={setVotes} popular={popular} setPopular={setPopular}/>
      </div>
  )
}

export default App
