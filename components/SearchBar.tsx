import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { mainPlayerData } from "../state/atom";
import {
	mainGameData,
	gameNameAtom,
	playersAtom,
	cardsAtom,
} from "../state/atom";

export const SearchBar = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(null);
	const gameData = useRecoilValue(mainGameData);
	const [playerData, setPlayerData] = useRecoilState(mainPlayerData);
	const [gameName, setGameName] = useRecoilState(gameNameAtom);
	const [players, setPlayers] = useRecoilState(playersAtom);
	const [color, setColor] = useState("yellow");
	const [cardsData, setCardsData] = useRecoilState(cardsAtom);
	const [shown, setShown] = useState(true);

	async function createGame() {
		const res1 = await fetch("api/GameCreate", {
			method: "POST",
			body: JSON.stringify({
				name: name,
				creator: playerData.name,
				key: playerData.key,
				cards: gameData.cards,
				color: color,
			}),
		});
		const res2 = await res1.json();
		if (res2.code === "Game set succesfully") {
			setShown(false);
			setGameName(res2.name);
			setCardsData(res2.cards);
			setPlayers(res2.players);
		} else {
			setError(res2.error);
		}
	}
	async function findGame() {
		const res1 = await fetch("api/GameFind", {
			method: "POST",
			body: JSON.stringify({
				game: name,
				player: playerData.name,
				key: playerData.key,
				currentField: 1,
				color: color,
			}),
		});
		const res2 = await res1.json();
		console.log("response");
		console.log(res2);
		if (res2.response.code === "Pomyślnie dołączono") {
			// console.log(res2);
			setShown(false);
			setPlayers(res2.response.game.players);
			setGameName(res2.response.game.name);
			setCardsData(res2.response.game.cards);
		} else if (res2.response.code === "Ponowne dołączanie do gry") {
			setShown(false);
			setError(res2.response.code);
			setPlayers(res2.response.game.players);
			setGameName(res2.response.game.name);
			setCardsData(res2.response.game.cards);
		} else {
			setError(res2.response.code);
		}
	}
	async function leaveGame() {
		const res1 = await fetch("api/GameLeave", {
			method: "POST",
			body: JSON.stringify({
				game: name,
				player: playerData.name,
				key: playerData.key,
			}),
		});
		const res2 = await res1.json();
		console.log("leaveGame:>> ", res2.response);
	}
	return (
		<div className="SearchBar">
			<div
				style={{
					display: shown ? "flex" : "none",
					flexDirection: "column",
				}}
			>
				{error}
				<input
					onChange={(e) => {
						setName(e.target.value);
					}}
				></input>
				<button
					onClick={() => {
						findGame();
					}}
				>
					Join Game
				</button>
				<button
					onClick={() => {
						leaveGame();
					}}
				>
					Leave Game
				</button>
				<button
					onClick={() => {
						createGame();
					}}
				>
					Create Game
				</button>
				<input
					placeholder="Your color here"
					onChange={(e) => {
						setColor(e.target.value);
					}}
				></input>
			</div>
			<button
				onClick={() => {
					setShown(!shown);
				}}
			>
				{shown ? "Hide" : "Show"}
			</button>
		</div>
	);
};
