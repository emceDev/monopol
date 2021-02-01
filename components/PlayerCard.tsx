import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { mainPlayerData } from "../state/atom";
import { mainGameData, playersAtom, focusedCardData } from "../state/atom";
import { DisplayModal } from "../microComponents/DisplayModal";

export const PlayerCard = () => {
	const [playerData, setPlayerData] = useRecoilState(mainPlayerData);
	const gameData = useRecoilValue(mainGameData);
	const [playersData, setPlayersData] = useRecoilState(playersAtom);
	const [err, setErr] = useState(null);
	const [cardData, setCardData] = useRecoilState(focusedCardData);

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
		setErr(res2.code);
		setCardData(res2?.data);
	}
	function roll() {
		let rolled = Math.floor(Math.random() * (12 - 2 + 1)) + 2;
		let previousField = playersData[playerData.name].currentField;
		let sum = previousField + rolled;
		if (sum > 40) {
			movePlayer(sum - 40);
		} else {
			movePlayer(sum);
		}
	}

	return (
		<div>
			{playerData.loggedIn ? (
				<div>
					<div>PlayerName:{playerData.name}</div>
					{err}
					<button onClick={() => roll()}>roll</button>
				</div>
			) : (
				<div>zaloguj siebie</div>
			)}
		</div>
	);
};
