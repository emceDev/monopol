import React, { useState, useEffect } from "react";
import { Player } from "../nanoComponents/Player";
import { Trade } from "../nanoComponents/Trade";

export const PlayersList = (props) => {
	return (
		<div
			className="PlayersList"
			style={{ display: "flex", flexDirection: "row" }}
		>
			{props.data !== null && props.data !== undefined
				? Object.values(props.data.players).map((player) => {
						return (
							<Player
								key={player["name"]}
								player={player}
								cards={props.data.cards}
							/>
						);
				  })
				: null}
			<Trade />
		</div>
	);
};
