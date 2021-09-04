import { Card } from "./Card";
import { useState } from "react";
import { DisplayModalCard } from "./DisplayModalCard";
export const Player = (props) => {
	const [expand, setExpand] = useState(true);
	return (
		<div
			id={props.player.name}
			key={props.player.name}
			className="Player"
			style={{ backgroundColor: props.player.color }}
			onMouseOver={() => {
				setExpand(true);
			}}
			onMouseLeave={() => {
				setExpand(false);
			}}
		>
			<div className="playerGeneral">
				<div>name: {props.player.name}</div>
				<div>balance: {props.player.balance}</div>
				<div>field: {props.player.currentField}</div>
			</div>
			{props.cards !== undefined && expand ? (
				<div className="mainPlayerCardList">
					{Object.values(props.cards).map((card: any) => {
						if (
							(card.owner === props.player.name &&
								(card.country === "koleje" || card.country === "other") !==
									true) === true
						) {
							return <DisplayModalCard cardData={card} key={card.id} />;
						} else return;
					})}
				</div>
			) : null}
		</div>
	);
};
