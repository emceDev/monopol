import { FieldCard } from "../nanoComponents/FieldCard";
import { DisplayModal } from "../microComponents/DisplayModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { highLight, mainPlayerData } from "../state/atom";
import { mainGameData, playersAtom, focusedCardData } from "../state/atom";

export const GameField = (props) => {
	const gameData = useRecoilValue(mainGameData);
	const [highLighted, sethiglighted] = useRecoilState(highLight);
	return (
		<div className="Field">
			{Object.values(props.data.cards).map((cardData: any) => {
				return (
					<FieldCard
						cardData={cardData}
						key={cardData.id}
						highLight={highLighted}
					/>
				);
			})}

			{/* {console.log(props.data.cards.map((x) => x))} */}
		</div>
	);
};
