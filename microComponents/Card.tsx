export const Card = (props) => {
	return (
		<div style={{ marginBottom: "2vh" }}>
			<p>{props.card.name}</p>
			<p>{props.card.price}</p>
		</div>
	);
};
