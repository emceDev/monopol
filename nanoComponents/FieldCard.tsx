// import { FieldCard } from "../microComponents/FieldCard";
import { useEffect } from "react";
import { mainGameData, playersAtom, focusedCardData } from "../state/atom";
import { useRecoilState } from "recoil";
export const FieldCard = (props) => {
	const [gameData, setGameData] = useRecoilState(mainGameData);
	const [cardData, setCardData] = useRecoilState(focusedCardData);

	useEffect(() => {
		// console.log(gameData.players.[props.cardData.owner].color);
	}, []);
	return (
		<div
			// style={{ backgroundColor:gameData.players.[props.cardData.owner].color}}
			className={"div" + props.cardData.id}
			id={props.cardData.id}
			onClick={() => {
				setCardData(props.cardData);
			}}
		>
			<div
				style={{
					width: "100%",
					height: "20%",
					backgroundColor:
						props.cardData.color !== undefined ? props.cardData.color : "gray",
				}}
			></div>
			{() => {
				for (let i = 0; i < props.cardData.homes.length; i++) {
					<div>x</div>;
				}
			}}
			<p>
				{props.cardData.id}.{props.cardData.name}
			</p>
			{props.cardData.price === 0 ? null : <p>Cena:{props.cardData.price}</p>}
			<ol>
				{!props.cardData.tax === true
					? null
					: props.cardData.tax.map((x) => <li>{x}</li>)}
			</ol>
			{!props.cardData.whoIsOn ? null : (
				<p style={{ backgroundColor: "red" }}>{props.cardData.whoIsOn}</p>
			)}
		</div>
	);
};
