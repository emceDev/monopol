export const Card = (props) => {
	return (
		<div
			id={props.card.id}
			style={{ marginBottom: "2vh", backgroundColor: props.card.color }}
			className="PlayersListCard"
		>
			<p>{props.card.name}</p>
			<p>Cena: {props.card.price}</p>
			{/* {props.trade.tradeOpen ? <input type="checkbox" /> : null} */}
		</div>
	);
};
