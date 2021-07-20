import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { DisplayModalCard } from "../nanoComponents/DisplayModalCard";
import { PlayerCardList } from "../nanoComponents/PlayerCardList";
import { mainPlayerData } from "../state/atom";
import { mainGameData, playersAtom, focusedCardData } from "../state/atom";
import { DisplayModal } from "./DisplayModal";

export const PlayerCard = () => {
	const [playerData, setPlayerData] = useRecoilState(mainPlayerData);
	const gameData = useRecoilValue(mainGameData);
	const [playersData, setPlayersData] = useRecoilState(playersAtom);
	const [err, setErr] = useState(null);
	const [cardData, setCardData] = useRecoilState(focusedCardData);
	const [cooldown, setCooldown] = useState(false);
	const [ownedFields, setownedFields] = useState(null);
	const [cardListHoover, setCardListHoover] = useState(false);
	useEffect(() => {
		let owned = Object.values(gameData.cards).filter(
			(card) => card.owner === playerData.name
		);
		setownedFields(owned);
	}, [gameData.cards]);

	async function movePlayer(fieldId) {
		const res1 = await fetch("api/PlayerMove", {
			method: "POST",
			body: JSON.stringify({
				playerName: playerData.name,
				gameName: gameData.name,
				previousField: playersData[playerData.name].currentField,
				nextField: fieldId,
			}),
		});
		const res2 = await res1.json();
		console.log("MOVEID");
		console.log(res2);
		// setErr(res2.code);

		setCardData(res2?.data);
	}
	function roll() {
		// console.log(gameData.queue);
		// console.log(=== playerData.name)
		let rolled = Math.floor(Math.random() * (12 - 2 + 1)) + 2;
		let previousField = playersData[playerData.name].currentField;
		let sum = previousField + rolled;
		if (sum > 40) {
			movePlayer(sum - 40);
		} else {
			movePlayer(sum);
		}
		setCooldown(true);
		setTimeout(() => {
			setCooldown(false);
		}, 5000);
	}

	return (
		<div className="PlayerCard">
			{playerData ? (
				<>
					<div className="PlayerCardUi">
						<div className="PlayerDataRoll">
							<p>{playerData.name}</p>
							<p>{playersData[playerData.name]?.balance}</p>
							{/* button */}
							{/* <div className="RollButton_active" onClick={roll}>
								Rzut kostką!
							</div> */}
							{gameData?.queue.players !== null &&
							gameData?.queue?.players[gameData.queue.current] ===
								playerData.name ? (
								<div className="RollButton_active" onClick={roll}>
									Rzut kostką!
								</div>
							) : (
								<div className="RollButton_inactive">
									Poczekaj na swoją kolejkę
								</div>
							)}
						</div>
						<div className="PlayerDisplayModal">
							<DisplayModal />
							<div
								className="mainPlayerCardList"
								onMouseOver={() => setCardListHoover(!cardListHoover)}
								onClick={() => setCardListHoover(!cardListHoover)}
								onMouseLeave={() => {
									setCardListHoover(false);
								}}
								style={{
									height: cardListHoover ? "fit-content" : "5vh",
								}}
							>
								{ownedFields?.map((field) => (
									<DisplayModalCard cardData={field} />
								))}
							</div>
						</div>
					</div>
				</>
			) : (
				<div>zaloguj siebie</div>
			)}
		</div>
	);
};
