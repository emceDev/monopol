import { useEffect } from "react";
export const DisplayModalCard = (props) => {
	// useEffect(() => {
	// 	console.log(props.cardData.id);
	// }, []);
	return (
		<div
			className="DisplayModalCard"
			style={{ backgroundColor: props.cardData.color }}
		>
			<p>
				{props.cardData.id}. {props.cardData.name}
			</p>
			<p>cena: {props.cardData.price}</p>
			{/* {console.log(props.cardData.tax)} */}
			{props.cardData.tax === undefined ||
			props.cardData.tax === null ? null : props.cardData.tax.length === 1 ? (
				<p>{props.cardData.tax[0]}</p>
			) : (
				<ol>
					{props.cardData.tax.map((x) => {
						return <li>{x}</li>;
					})}
				</ol>
			)}
		</div>
	);
};
