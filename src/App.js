import { nanoid } from 'nanoid';
import { useState } from 'react';
import Die from './components/Die';

export default function App() {
	const [dice, setDice] = useState(allNewDice());

	function generateNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		return Array(10)
			.fill('')
			.map(() => generateNewDie());
	}

	const diceElements = dice.map(die => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));

	function holdDice(diceId) {
		setDice(oldDice =>
			oldDice.map(die =>
				die.id === diceId ? { ...die, isHeld: !die.isHeld } : die
			)
		);
	}

	function rollDice() {
		setDice(oldDice =>
			oldDice.map(die => (die.isHeld ? die : generateNewDie()))
		);
	}
	return (
		<main>
			<h1 className='title'>Tenzies</h1>
			<p className='instructions'>
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<div className='dice-container'>{diceElements}</div>
			<button onClick={rollDice} className='roll-btn'>
				Roll
			</button>
		</main>
	);
}
