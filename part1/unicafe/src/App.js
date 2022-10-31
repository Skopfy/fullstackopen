import { useState } from 'react'

const Feedback = (props) => {
    const IncrementGood = () => props.setGood(props.good + 1)
    const IncrementNeutral = () => props.setNeutral(props.neutral + 1)
    const IncrementBad = () => props.setBad(props.bad + 1)
    return(
	<>
	    <h1>Feedback</h1>
	    <button onClick={IncrementGood}>good</button>
	    <button onClick={IncrementNeutral}>neutral</button>
	    <button onClick={IncrementBad}>bad</button>
	    </>
    )
}

const Statistics = (props) => {
    const calcAll = () => props.good + props.neutral + props.bad
    const calcAvg = () => (props.good * 1 - props.bad * 1) / calcAll()
    const calcPos = () => props.good / calcAll()
    return(
	    <>
	    <h1>Statistics</h1>
	    <p>Good reviews: {props.good}</p>
	    <p>Neutral reviews: {props.neutral}</p>
	    <p>Bad reviews: {props.bad}</p>
	    <p>All reviews: {calcAll()} </p>
	    <p>Average: {calcAvg()} </p>
	    <p>Positive: {calcPos()} </p>
	    </>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
	  < Feedback good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad} />
	  < Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App
