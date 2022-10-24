import { nanoid } from 'nanoid';
import { useState } from 'react';
import Die from './components/Die';

export default function App() {
	const [diceArray, setDiceArray] = useState(allNewDice());

	function allNewDice() {
		return Array(10)
			.fill('')
			.map(() => {
				const randomDie = Math.ceil(Math.random() * 6);
				return { value: randomDie, isHeld: false, id: nanoid() };
			});
	}

	const diceElements = diceArray.map(die => (
		<Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
	));

	function holdDice(diceId) {
		setDiceArray(prev =>
			prev.map(die => (die.id === diceId ? { ...die, isHeld: !die.isHeld } : die))
		);
	}
	return (
		<main>
			<div className='dice-container'>{diceElements}</div>
			<button onClick={() => setDiceArray(allNewDice())} className='roll-btn'>
				Roll
			</button>
		</main>
	);
}
