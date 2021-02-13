export const DisplayModalCard = (props) => {
	return (
		<div
			className="DisplayModalCard"
			style={{ backgroundColor: props.cardData.color }}
		>
			<p>
				{props.cardData.id}. {props.cardData.name}
			</p>
			{props.cardData.price !== 0 ? <p>cena: {props.cardData.price}</p> : null}
			{/* {console.log(props.cardData.tax)} */}
			{props.cardData.tax === undefined ||
			props.cardData.tax === null ? null : props.cardData.tax.length === 1 ? (
				<>
					<p>{props.cardData.tax[0]}</p>
				</>
			) : (
				<>
					<p>Cena domq: {props.cardData.homeCost}</p>
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
