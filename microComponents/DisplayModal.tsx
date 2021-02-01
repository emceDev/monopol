import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { mainPlayerData } from "../state/atom";
import { mainGameData, playersAtom, focusedCardData } from "../state/atom";
import { DisplayModalButtons } from "../nanoComponents/DisplayModalButtons";
import { DisplayModalCard } from "../nanoComponents/DisplayModalCard";
const Chance = (props) => {
	return (
		<div>
			<p>Szansa</p>
			<p>Tytuł:{props.title}</p>
			<p>Opis:{props.description}</p>
		</div>
	);
};

export const DisplayModal = () => {
	const [playerData, setPlayerData] = useRecoilState(mainPlayerData);
	const gameData = useRecoilValue(mainGameData);
	const [playersData, setPlayersData] = useRecoilState(playersAtom);
	const [err, setErr] = useState(null);
	const [cardData, setCardData] = useRecoilState(focusedCardData);

	useEffect(() => {
		console.log("cardDatawModal");
		console.log(cardData);
	}, [cardData]);
	return (
		<div className="DisplayModal">
			{cardData !== null ? (
				<>
					cardData.title
					{cardData.title !== undefined ? (
						<Chance title={cardData.title} description={cardData.description} />
					) : (
						<DisplayModalCard cardData={cardData} />
					)}
					{cardData.price !== 0 && cardData.owner === "bank" ? (
						// buy sell cardData.owner === "bank" cardData.price > 0
						// zloz oferte playerCurrent !==card.id
						// nic cardData.owner === "bank"cardData.price === 0
						<DisplayModalButtons
							cardData={cardData}
							playerName={playerData.name}
							gameName={gameData.name}
						/>
					) : null}
				</>
			) : null}
		</div>
	);
};
