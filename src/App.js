import { useState } from 'react';
import Die from './components/Die';

export default function App() {
	const [diceArray, setDiceArray] = useState(allNewDice());

	function allNewDice() {
		return Array(10)
			.fill('')
			.map((die, index) => {
				const randomDie = Math.ceil(Math.random() * 6);
				return <Die value={randomDie} key={index} />;
			});
	}
	return (
		<main>
			<div className='dice-container'>{diceArray}</div>
		</main>
	);
}
