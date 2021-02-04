// import { FieldCard } from "../microComponents/FieldCard";
import { useEffect, useState } from "react";
import { mainGameData, playersAtom, focusedCardData } from "../state/atom";
import { useRecoilState, useRecoilValue } from "recoil";
export const FieldCard = (props) => {
	const gameData = useRecoilValue(mainGameData);
	const [cardData, setCardData] = useRecoilState(focusedCardData);
	const [scale, setScale] = useState(false);
	useEffect(() => {}, [gameData]);
	return (
		<div
			style={{
				backgroundColor: gameData.players[props.cardData.owner]
					? gameData.players[props.cardData.owner].color
					: "#F9EAE1",
			}}
			className={"div" + props.cardData.id}
			id={props.cardData.id}
			onClick={() => {
				setCardData(props.cardData);
			}}
			onMouseEnter={() => {
				setScale(true);
			}}
			onMouseLeave={() => {
				setScale(false);
			}}
		>
			<div className="cardData">
				<div
					className="cardDataHomes"
					style={{
						width: "100%",
						height: "20%",
						zIndex: 100,
						backgroundColor:
							props.cardData.color !== undefined
								? props.cardData.color
								: "gray",
					}}
				>
					{() => {
						for (let i = 0; i < props.cardData.homes.length; i++) {
							<div>x</div>;
						}
					}}
				</div>
				<p>
					{props.cardData.id}.{props.cardData.name}
				</p>
				{props.cardData.price === 0 ? null : <p>Cena:{props.cardData.price}</p>}
				<ol style={{ display: scale ? "block" : "none" }}>
					{props.cardData.tax === null ||
					(props.cardData.tax === undefined) === true
						? null
						: props.cardData.tax.map((x) => <li>{x}</li>)}
				</ol>
				{!props.cardData.whoIsOn ? null : (
					<p style={{ backgroundColor: "Brown" }}>{props.cardData.whoIsOn}</p>
				)}
			</div>
		</div>
	);
};
