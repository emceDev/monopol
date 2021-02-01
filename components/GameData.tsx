import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { PlayersList } from "../microComponents/PlayersList";
import {
	mainGameData,
	cardsAtom,
	playersAtom,
	gameNameAtom,
} from "../state/atom";
import { GameField } from "../microComponents/GameField";
import swr from "swr";
export const GameData = () => {
	const [gameData, setGameData] = useRecoilState(mainGameData);
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

		setCardsData(response.data.cards);
		setPlayersData(response.data.players);
	}

	useEffect(() => {
		if ((gameData.name !== null) === true) {
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
					{gameData.players !== null ? <PlayersList data={gameData} /> : null}
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
