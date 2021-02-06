import { Card } from "../microComponents/Card";

export const Player = (props) => {
	return (
		<div style={{ marginLeft: "5vh" }}>
			<div>name: {props.player.name}</div>
			<div>balance: {props.player.balance}</div>
			{props.cards !== undefined ? (
				<div style={{ maxHeight: "20vh", overflow: "overlay" }}>
					{Object.values(props.cards).map((card: any) => {
						if ((card.owner === props.player.name) === true) {
							return <Card card={card} key={card.id} />;
						} else return;
					})}
				</div>
			) : (
				<p>no cards at that moment</p>
			)}
		</div>
	);
};
