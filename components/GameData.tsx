import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	mainGameData,
	cardsAtom,
	playersAtom,
	gameNameAtom,
} from "../state/atom";
import { GameField } from "../microComponents/GameField";
import swr from "swr";
export const GameData = () => {
	const gameData = useRecoilValue(mainGameData);
	const [cardsData, setCardsData] = useRecoilState(cardsAtom);
	const [playersData, setPlayersData] = useRecoilState(playersAtom);
	const [gameName, setGameName] = useRecoilState(gameNameAtom);

	async function observ(x) {
		setInterval(async () => {
			const observer = await fetch("api/GameObserver", {
				method: "POST",
				body: JSON.stringify({
					game: x,
				}),
			});
			let response = await observer.json();
			console.log("response :>> ");
			console.log(response);
			setCardsData(response.data.cards);
			setPlayersData(response.data.players);
			console.log("mainGameData");
			console.log(gameData);
		}, 2000);
	}

	useEffect(() => {
		if ((gameData.name !== null) === true) {
			console.log("mainGameData");
			console.log(gameData);
		}
		return;
	}, [gameData]);
	return (
		<div>
			{gameData.name === null ? null : (
				<div>
					<p>GameName:{gameData.name}</p>
					<button onClick={() => observ(gameData.name)}>Start</button>
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
