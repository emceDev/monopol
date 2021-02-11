import React, { useState, useEffect } from "react";
import { Player } from "../nanoComponents/Player";
import { Trade } from "../nanoComponents/Trade";

export const PlayersList = (props) => {
	const [focus, setFocus] = useState(true);
	const [showTrade, setShowTrade] = useState(false);
	return (
		<div className="PlayersList">
			{props.data !== null && props.data !== undefined
				? Object.values(props.data.players).map((player) => {
						return (
							<Player
								key={player["name"]}
								player={player}
								cards={props.data.cards}
								focus={focus}
							/>
						);
				  })
				: null}
			<button onClick={() => setFocus(!focus)}>Szczegóły</button>
			<button onClick={() => setShowTrade(!showTrade)}>handel</button>
			{showTrade ? <Trade /> : null}
		</div>
	);
};
