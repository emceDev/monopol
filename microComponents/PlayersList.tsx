import React, { useState, useEffect } from "react";
import { Player } from "../nanoComponents/Player";
export const PlayersList = (props) => {
	return (
		<div
			className="PlayersList"
			style={{ display: "flex", flexDirection: "row" }}
		>
			<div>PlayersList</div>
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
		</div>
	);
};
