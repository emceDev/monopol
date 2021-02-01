import { FieldCard } from "../nanoComponents/FieldCard";
import { DisplayModal } from "../microComponents/DisplayModal";
import { PlayerCard } from "../microComponents/PlayerCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { mainPlayerData } from "../state/atom";
import { mainGameData, playersAtom, focusedCardData } from "../state/atom";
import { PlayersList } from "./PlayersList";

export const GameField = (props) => {
	const gameData = useRecoilValue(mainGameData);
	function clicked(e) {
		console.log(e.target.id);
	}

	return (
		<div className="Field" onClick={(e) => clicked(e)}>
			<DisplayModal />
			<PlayerCard />
			{gameData.players !== null ? <PlayersList data={gameData} /> : null}
			{Object.values(props.data.cards).map((cardData: any) => {
				return <FieldCard cardData={cardData} key={cardData.id} />;
			})}
			{/* {console.log(props.data.cards.map((x) => x))} */}
		</div>
	);
};
