import { useEffect, useState } from "react";
import { mainGameData, playersAtom, focusedCardData } from "../state/atom";
import { useRecoilState, useRecoilValue } from "recoil";
export const FieldCard = (props) => {
	const gameData = useRecoilValue(mainGameData);
	const [cardData, setCardData] = useRecoilState(focusedCardData);
	const [scale, setScale] = useState(false);
	const [homes, setHomes] = useState([]);

	useEffect(() => {
		let homesArr = [];
		for (let i = 0; i < props.cardData.homes; i++) {
			homesArr.push(<div className="home"></div>);
		}
		setHomes(homesArr);
	}, [gameData]);
	return (
		<div
			style={{
				backgroundColor: gameData.players[props.cardData.owner]
					? gameData.players[props.cardData.owner].color
					: "#F9EAE1",
			}}
			className={"div" + props.cardData.id + " " + "FieldCard"}
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
						backgroundColor:
							props.cardData.color !== undefined
								? props.cardData.color
								: "gray",
					}}
				>
					{homes}
				</div>
				<div className="CardDataContainer">
					<div>
						<div style={{ fontWeight: "bold" }}>
							{props.cardData.id}.{props.cardData.name}
						</div>
						<div>
							{props.cardData.country !== "other"
								? props.cardData.country
								: null}
						</div>

						{props.cardData.price === 0 ? null : <p>{props.cardData.price}</p>}
					</div>
					<ol
						style={{
							// display: scale ? "block" : "none",
							opacity: scale ? "1" : "0",
							// transform: scale ? "scaleY(1)" : "scaleY(0)",
							// height: scale ? "7vw" : "0%",
							backgroundColor: gameData.players[props.cardData.owner]?.color,
						}}
						className="taxList"
					>
						{props.cardData.tax === null ||
						(props.cardData.tax === undefined) === true
							? null
							: props.cardData.tax.map((x) => <li>{x}</li>)}
					</ol>
				</div>

				{!props.cardData.whoIsOn ? null : (
					<div
						className="whoIsOn"
						style={{
							position: "absolute",
							width: "fit-content",

							backgroundColor: gameData?.players[props.cardData.whoIsOn]?.color,
						}}
					>
						{props.cardData.whoIsOn.length === 1 ? (
							<div className="cardDataPlayer">{props.cardData.whoIsOn}</div>
						) : (
							props.cardData.whoIsOn.map((player) => {
								return (
									<div
										className="cardDataPlayer"
										style={{
											border: "1px solid",
											padding: "5%",
											backgroundColor: gameData?.players[player]?.color,
										}}
									>
										{player}
									</div>
								);
							})
						)}
					</div>
				)}
			</div>
		</div>
	);
};
