import { highLight } from "../state/atom";
import { useRecoilState, useRecoilValue } from "recoil";
export const DisplayModalCard = (props) => {
	const [highLighted, setHighLight] = useRecoilState(highLight);
	return (
		<div
			className="DisplayModalCard"
			style={{ backgroundColor: props.cardData.color }}
			onClick={() => {
				setHighLight(props.cardData.id);
			}}
		>
			<p>
				{props.cardData.id}. {props.cardData.name}
			</p>
			{props.cardData.price !== 0 ? (
				<div>cena: {props.cardData.price}</div>
			) : null}
			{/* {console.log(props.cardData.tax)} */}
			{props.cardData.tax === undefined ||
			props.cardData.tax === null ? null : props.cardData.tax.length === 1 ? (
				<>
					<div>{props.cardData.tax[0]}</div>
				</>
			) : (
				<>
					<div>Cena domq: {props.cardData.homeCost}</div>
					<ol>
						{props.cardData.tax.map((x) => {
							return <li>{x}</li>;
						})}
					</ol>
				</>
			)}
		</div>
	);
};
