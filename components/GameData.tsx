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
} from "../state/atom";
import { NewsFeed } from "../microComponents/NewsFeed";
import { PlayerCard } from "../microComponents/PlayerCard";
import { GameField } from "../microComponents/GameField";
import { PlayersList } from "../microComponents/PlayersList";
import { Trade } from "../nanoComponents/Trade";
import { Auction } from "../microComponents/Auction";

export const GameData = () => {
	const gameData = useRecoilValue(mainGameData);
	const [cardsData, setCardsData] = useRecoilState(cardsAtom);
	const [playersData, setPlayersData] = useRecoilState(playersAtom);
	const [newsFeedData, setNewsFeedData] = useRecoilState(newsFeedAtom);
	const [gameName, setGameName] = useRecoilState(gameNameAtom);
	const [player, setmainplayer] = useRecoilState(mainPlayerData);
	const [trade, setTrade] = useRecoilState(tradeAtom);
	const [observing, setObserving] = useState(false);
	const [queue, setQueue] = useRecoilState(queueAtom);
	const [auction, setAuction] = useState(null);

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
			console.log("response :>> ");
			console.log(response);
			setCardsData(response.data.cards);
			setPlayersData(response.data.players);
			setNewsFeedData(response.data.newsFeed);
			setTrade(response.data.offers);
			setQueue(response.data.queue);
			setAuction(response.data.auction);
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
					<div className="UI">
						{!observing ? (
							<button
								className="StartButton"
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
								// przycisk odpierdala
								// po chance tez odpierala
								// licytacja nie dziala cardowner set
								// da sie wymienic pole ktorego sie niema
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
