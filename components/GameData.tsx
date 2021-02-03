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
	}

	useEffect(() => {
		if ((gameData.name !== null) === true) {
			console.log("mainGameData");
			console.log(gameData);
			observ(gameData.name);
		}
	}, [gameData.players]);
	return (
		<div>
			<h1>game</h1>
			<button onClick={() => console.log(gameData)}>adasd</button>
			{gameData.name === null ? (
				<div>xd</div>
			) : (
				<div>
					<p>GameName:{gameData.name}</p>
					<div>
						{gameData.cards !== null ? (
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
