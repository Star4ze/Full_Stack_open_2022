import { useState } from 'react'

const Button = (props) => (
	<button onClick={props.handleClick}>{props.name}</button>
)

const Statistics = (props) => {
	var good = props.gd
	var bad = props.bd
	var neutral = props.ntl
	if (!good && !bad && !neutral) {
		return (
			<div>
				<h1>statistics</h1>
				<p>No feedback given</p>
			</div>
		)
	}
	else {
		return (
			<div>
				<h1>statistics</h1>
				<table>
					<tbody>
						<StatisticLine text="good" value={good} />
						<StatisticLine text="neutral" value={neutral} />
						<StatisticLine text="bad" value={bad} />
						<StatisticLine text="all" value={good + neutral + bad} />
						<StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
						<StatisticLine text="positive" value={good / (good + neutral + bad) * 100} extra="%" />
					</tbody>
				</table>
			</div>
		)
	}
}

const StatisticLine = (props) => (
	<tr>
		<td> {props.text} </td>
		<td> {props.value}{props.extra} </td>
	</tr>

)

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)



	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={() => setGood(good + 1)} name="good" />
			<Button handleClick={() => setNeutral(neutral + 1)} name="neutral" />
			<Button handleClick={() => setBad(bad + 1)} name="bad" />

			<Statistics gd={good} bd={bad} ntl={neutral} />

		</div>
	)
}

export default App