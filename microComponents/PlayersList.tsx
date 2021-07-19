import React, { useState, useEffect } from "react";
import { Player } from "../nanoComponents/Player";
import { Trade } from "../nanoComponents/Trade";
import { useRecoilState, useRecoilValue } from "recoil";
import { tradeAtom } from "../state/atom";

export const PlayersList = (props) => {
	const [trade, setTrade] = useRecoilState(tradeAtom);
	const [focus, setFocus] = useState(true);
	const [showTrade, setShowTrade] = useState(false);
	const [isTrade, setIsTrade] = useState(false);
	useEffect(() => {
		if (trade !== undefined) {
			setIsTrade(true);
		} else {
			setIsTrade(false);
		}
	}, [trade]);
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
			{isTrade ? (
				<button
					onClick={() => setShowTrade(!showTrade)}
					className="TradeButtonHighLighted"
				>
					Handel
				</button>
			) : (
				<button
					onClick={() => setShowTrade(!showTrade)}
					className="TradeButton"
				>
					Handel
				</button>
			)}
			{showTrade ? (
				<div>
					{/* {console.log(trade !== undefined)} */}
					<Trade />
					<button onClick={() => setShowTrade(false)}>wyjdź</button>
				</div>
			) : null}
		</div>
	);
};
