import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import Die from './components/Die';

export default function App() {
	const [dice, setDice] = useState(allNewDice());

	const [tenzie, setTenzie] = useState({
		won: false,
		moves: 0,
	});

	useEffect(() => {
		if (dice.every(die => die.isHeld && die.value === dice[0].value)) {
			setTenzie(prev => ({ ...prev, won: true }));
		} else {
			setTenzie(prev => ({ ...prev, won: false }));
		}
	}, [dice]);

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
		if (!tenzie.won) {
			setDice(oldDice =>
				oldDice.map(die => (die.isHeld ? die : generateNewDie()))
			);
			setTenzie(prev => ({ ...prev, moves: prev.moves + 1 }));
		} else {
			setDice(allNewDice());
			setTenzie({ won: false, moves: 0 });
		}
	}

	const winMsg = (
		<div className='modal'>
			<h3 className='win-title'>Congratulation!!</h3>
			<p className='win-message'>You won in {tenzie.moves} moves!</p>
		</div>
	);
	return (
		<>
			{tenzie.won && <ReactConfetti />}
			<main>
				{tenzie.won && winMsg}
				<h1 className='title'>Tenzies</h1>
				<p className='instructions'>
					Roll until all dice are the same. Click each die to freeze it at its
					current value between rolls.
				</p>
				<div className='dice-container'>{diceElements}</div>
				<button onClick={rollDice} className='roll-btn'>
					{tenzie.won ? 'New Game' : 'Roll'}
				</button>
			</main>
		</>
	);
}
