export default function Die(props) {
	return (
		<button
			onClick={props.holdDice}
			className={`die ${props.isHeld ? 'selected' : ''}`}>
			{props.value}
		</button>
	);
}
