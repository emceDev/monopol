import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	mainGameData,
	cardsAtom,
	playersAtom,
	gameNameAtom,
	newsFeedAtom,
	tradeAtom,
	queueAtom,
	mainPlayerData,
	hintAtom,
} from "../state/atom";
import { NewsFeed } from "../microComponents/NewsFeed";
import { PlayerCard } from "../microComponents/PlayerCard";
import { GameField } from "../microComponents/GameField";
import { PlayersList } from "../microComponents/PlayersList";
import { Trade } from "../nanoComponents/Trade";
import { Auction } from "../microComponents/Auction";

const hintText = `Po założeniu gry, należy rozpocząć odświeżanie gry klikając start i oczekiwać na innych graczy`;
const hintText2 = `Odświeżanie się rozpoczęło, `;
export const GameData = () => {
	const gameData = useRecoilValue(mainGameData);
	const [cardsData, setCardsData] = useRecoilState(cardsAtom);
	const [playersData, setPlayersData] = useRecoilState(playersAtom);
	const [newsFeedData, setNewsFeedData] = useRecoilState(newsFeedAtom);
	const [player, setmainplayer] = useRecoilState(mainPlayerData);
	const [trade, setTrade] = useRecoilState(tradeAtom);
	const [observing, setObserving] = useState(false);
	const [queue, setQueue] = useRecoilState(queueAtom);
	const [auction, setAuction] = useState(null);
	const [hint, setHintAtom] = useRecoilState(hintAtom);

	async function observ(x) {
		setHintAtom(hintText2);
		console.log("Observing began");
		setObserving(true);
		setInterval(async () => {
			console.log("ObservingInterval");
			const observer = await fetch("api/GameObserver", {
				method: "POST",
				body: JSON.stringify({
					game: x,
				}),
			});
			let response = await observer.json();

			setCardsData(response.data.cards);
			setPlayersData(response.data.players);
			setNewsFeedData(response.data.newsFeed);
			setTrade(response.data.offers);
			setQueue(response.data.queue);
			setAuction(response.data.auction);
		}, 5000);
	}

	useEffect(() => {
		setHintAtom(hintText);
		window.addEventListener("keydown", function (e) {
			// console.log(e.target.type);
			if (e.target.type === "number" || e.target.type === "text") {
				return;
			} else {
				if (e.key === "s") {
					window.scrollBy(0, 250);
				}
				if (e.key === "w") {
					window.scrollBy(0, -250);
				}
				if (e.key === "d") {
					window.scrollBy(250, 0);
				}
				if (e.key === "a") {
					window.scrollBy(-250, 0);
				}
			}
		});
		return;
	}, []);

	const getDeviceType = () => {
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			return "tablet";
		}
		if (
			/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
				ua
			)
		) {
			return "mobile";
		}
		return "desktop";
	};
	async function sendDevice() {
		let type = getDeviceType();
		await fetch("api/SendDevice", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				device: type,
			}),
		});
	}

	return (
		<div className="GameData">
			{gameData.name === null ? null : (
				<div>
					<p>GameName:{gameData.name}</p>
					<div className="UI">
						{!observing ? (
							<button
								id="GameStartButton"
								className="StartButton"
								// onClick={() => sendDevice()}
								onClick={() => observ(gameData.name)}
							>
								Start
							</button>
						) : null}
						<PlayerCard />
						<NewsFeed news={newsFeedData} />
						{auction === undefined || auction === null ? null : (
							<Auction
								auction={auction}
								game={gameData.name}
								player={player.name}
							/>
						)}
						{gameData.players !== null ? <PlayersList data={gameData} /> : null}
					</div>
					<div className="FieldContainer">
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
