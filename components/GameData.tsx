import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	mainGameData,
	cardsAtom,
	playersAtom,
	gameNameAtom,
	newsFeedAtom,
	tradeAtom,
} from "../state/atom";
import { GameField } from "../microComponents/GameField";
import swr from "swr";
export const GameData = () => {
	const gameData = useRecoilValue(mainGameData);
	const [cardsData, setCardsData] = useRecoilState(cardsAtom);
	const [playersData, setPlayersData] = useRecoilState(playersAtom);
	const [newsFeedData, setNewsFeedData] = useRecoilState(newsFeedAtom);
	const [gameName, setGameName] = useRecoilState(gameNameAtom);
	const [trade, setTrade] = useRecoilState(tradeAtom);
	const [observing, setObserving] = useState(false);

	async function observ(x: string) {
		setObserving(true);
		setInterval(async () => {
			const observer = await fetch("api/GameObserver", {
				method: "POST",
				body: JSON.stringify({
					game: x,
				}),
			});
			let response = await observer.json();
			// console.log("response :>> ");
			// console.log(response);
			setCardsData(response.data.cards);
			setPlayersData(response.data.players);
			setNewsFeedData(response.data.newsFeed);
			setTrade(response.data.offers);
			// console.log("mainGameData");
			// console.log(gameData);
		}, 2000);
	}

	useEffect(() => {
		if ((gameData.name !== null) === true) {
			// console.log("mainGameData");
			// console.log(gameData);
		}
		return;
	}, [gameData]);
	return (
		<div className="GameData">
			{gameData.name === null ? null : (
				<div>
					<p>GameName:{gameData.name}</p>
					{!observing ? (
						<button onClick={() => observ(gameData.name)}>Start</button>
					) : null}
					<div>
						{gameData.cards !== null && gameData.players !== null ? (
							<GameField data={gameData} />
						) : (
							<p>no cards in game</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
