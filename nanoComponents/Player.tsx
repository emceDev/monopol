import { Card } from "./Card";

export const Player = (props) => {
	return (
		<div
			style={{ marginLeft: "5vh" }}
			id={props.player.name}
			key={props.player.name}
			className="Player"
		>
			<div>name: {props.player.name}</div>
			<div>balance: {props.player.balance}</div>
			{props.cards !== undefined ? (
				<div style={{ maxHeight: "20vh", overflow: "overlay" }}>
					{Object.values(props.cards).map((card: any) => {
						if (
							(card.owner === props.player.name &&
								(card.country === "koleje" || card.country === "other") !==
									true) === true
						) {
							return <Card card={card} key={card.id} trade={props.trade} />;
						} else return;
					})}
				</div>
			) : (
				<p>no cards at that moment</p>
			)}
		</div>
	);
};
