import { FieldCard } from "../nanoComponents/FieldCard";
import { DisplayModal } from "../microComponents/DisplayModal";
export const GameField = (props) => {
	function clicked(e) {
		console.log(e.target.id);
	}

	return (
		<div className="Field" onClick={(e) => clicked(e)}>
			<DisplayModal />
			{}
			{Object.values(props.data.cards).map((cardData: any) => {
				return <FieldCard cardData={cardData} key={cardData.id} />;
			})}
			{/* {console.log(props.data.cards.map((x) => x))} */}
		</div>
	);
};
