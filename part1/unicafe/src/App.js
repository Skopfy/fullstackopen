import { useState } from 'react'

const Feedback = (props) => {
    const IncrementGood = () => props.setGood(props.good + 1)
    const IncrementNeutral = () => props.setNeutral(props.neutral + 1)
    const IncrementBad = () => props.setBad(props.bad + 1)
    return(
	<>
	    <h1>Feedback</h1>
	    <Button onClick={IncrementGood} text={"good"} />
	    <Button onClick={IncrementNeutral} text={"neutral"} />
	    <Button onClick={IncrementBad} text={"bad"} />
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

const Statistics = (props) => {
    const calcAll = () => props.good + props.neutral + props.bad
    const calcAvg = () => (props.good * 1 - props.bad * 1) / calcAll()
    const calcPos = () => props.good / calcAll()
    const noFeedback = () => (props.good === 0) && (props.neutral === 0) && (props.bad === 0)
    if (noFeedback())
    {
	return (
		<div>
		the app is used by pressing the buttons
	    </div>
	)
    }
    return(
	    <>
	    <h1>Statistics</h1>
	     <table>
	    < StatisticsLine text={"Good reviews"} stat={props.good} perc={""}/>
	    < StatisticsLine text={"Neutral reviews"} stat={props.neutral} perc={""}/>
	    < StatisticsLine text={"Bad reviews"} stat={props.bad} perc={""}/>
	    < StatisticsLine text={"All reviews"} stat={calcAll()} perc={""}/>
	    < StatisticsLine text={"Average"} stat={calcAvg()} perc={""}/>
	    < StatisticsLine text={"Positive"} stat={calcPos()} perc={"%"}/>
	    </table>
	    </>
    )
}

const StatisticsLine = (props) => {

    return(
	    <>
	    <tr>
	    <td> {props.text} </td>
	    <td> {props.stat}{props.perc} </td>
	    </tr>
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
