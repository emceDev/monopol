import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { mainPlayerData } from "../state/atom";
import {
	mainGameData,
	gameNameAtom,
	playersAtom,
	cardsAtom,
} from "../state/atom";
import { AwaitingGames } from "../microComponents/AwaitingGames";
import { FeedbackForm } from "../microComponents/FeedbackForm";
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
	const [forRep, setForRep] = useState(true);
	const [dowRep, setDowRep] = useState(true);
	async function createGame() {
		console.log("create game playerData");
		console.log(playerData);
		const res1 = await fetch("api/GameCreate", {
			method: "POST",
			body: JSON.stringify({
				name: name,
				creator: playerData.name,
				key: playerData.key,
				cards: gameData.cards,
				color: playerData.color,
				queue: gameData.queue,
			}),
		});
		console.log();
		const res2 = await res1.json();
		if (res2.code === "Pomyślnie założono grę") {
			setShown(false);
			setGameName(res2.name);
			setCardsData(res2.cards);
			setPlayers(res2.players);
		} else {
			setError(res2.error);
		}
	}
	async function findGame(gameName = name) {
		const res1 = await fetch("api/GameFind", {
			method: "POST",
			body: JSON.stringify({
				game: gameName,
				player: playerData.name,
				key: playerData.key,
				currentField: 1,
				color: color,
			}),
		});
		const res2 = await res1.json();
		// console.log("response");
		// console.log(res2);
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
	async function downloadReport(e) {
		e.target.textContent = "Jeszcze niedostępne";
		dowRep
			? (async () => {
					await fetch("api/DownloadReport", {
						method: "POST",
						body: JSON.stringify({}),
					});
					setDowRep(false);
			  })()
			: null;
	}
	async function forumReport(e) {
		e.target.textContent = "Jeszcze niedostępne";
		// e.target.onclick=null
		forRep
			? (async () => {
					await fetch("api/ForumReport", {
						method: "POST",
						body: JSON.stringify({}),
					});
					setForRep(false);
			  })()
			: null;
	}
	function joinGame(name) {
		// console.log(name);
		setName(name, findGame(name));
	}
	return (
		<div className="SearchBar">
			{/* <><Tips/></> */}
			<>
				<div
					style={{
						display: shown ? "flex" : "none",
						flexDirection: "column",
					}}
				>
					<p
						className="error"
						id="ErrorField"
						style={{ color: "white", fontWeight: "bolder" }}
					>
						{error}
					</p>
					<input
						onChange={(e) => {
							setName(e.target.value);
						}}
						id="GameNameInput"
						style={{ textAlign: "center" }}
						placeholder="Wpisz tutaj nazwę swojej gry"
					></input>
					<button
						onClick={() => {
							findGame();
						}}
						id="FindGameButton"
					>
						Dołącz do gry
					</button>
					<button
						style={{ display: "none" }}
						onClick={() => {
							leaveGame();
						}}
						id="LeaveGameButton"
					>
						Wyjdź z gry
					</button>
					<button
						onClick={() => {
							createGame();
						}}
						id="CreateGameButton"
					>
						Stwórz grę
					</button>
					<input
						style={{ display: "none" }}
						placeholder="Kolor twojego pionka po angielsku"
						onChange={(e) => {
							setColor(e.target.value);
						}}
						id="ColorInput"
					></input>
					<FeedbackForm />
					<div style={{ display: "flex", justifyContent: "space-evenly" }}>
						<button
							onClick={(e) => {
								forumReport(e);
							}}
						>
							Sprawdź forum
						</button>
						<button
							onClick={(e) => {
								downloadReport(e);
							}}
						>
							Pobierz aplikacje
						</button>
					</div>
				</div>
				<AwaitingGames joinGame={(name) => joinGame(name)} />
				<button
					style={{ display: "none" }}
					onClick={() => {
						setShown(!shown);
					}}
					className={shown ? "SearchBarToggleOn" : "SearchBarToggleOff"}
				>
					{shown ? "Zwiń menu" : "Rozwiń menu"}
				</button>
			</>
		</div>
	);
};

const Tips = () => {
	return (
		<div>
			Aby założyć gre wpisz poniżej jej nazwę i kliknij załóż, lub jeśli chcesz
			dołączyć do gry wpisz jej nazwę i wpisz dołącz
		</div>
	);
};
