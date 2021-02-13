import { DisplayModalCard } from "../nanoComponents/DisplayModalCard";
import { useState } from "react";

export const Auction = (props) => {
	const [bet, setBet] = useState(props.auction.price);
	const [current, setCurrent] = useState(props.auction.queue.current);
	const [auctionUpdate, setAuctionUpdate] = useState(props.auction);

	async function handleAuction(action) {
		if (action === "bet" && bet < props.auction.price) {
			console.log("too small shiet");
		} else {
			const res1 = await fetch("api/Auction", {
				method: "POST",
				body: JSON.stringify({
					code: action,
					game: props.game,
					player: props.player,
					amount: bet,
				}),
			});
			const res2 = await res1.json();
			console.log("handledAucyion");
			console.log(res2);
		}
	}

	return (
		<div
			className="Auction"
			style={{ position: "fixed", top: "20vh", left: "30vw" }}
		>
			<DisplayModalCard cardData={props.auction.card} />
			<div>
				<p>{props?.auction?.player}</p>
				<p>{props?.auction?.price}</p>
				<input
					onChange={(e) => setBet(e.target.value)}
					type="number"
					min={props.auction.price}
				></input>
				{console.log(
					props.auction.queue.players.players[
						props.auction.queue.players.current
					]
					// props.auction.queue.players.players[0][
					// 	props.auction.queue.players.current
					// ]
				)}
				{props.auction.queue.players.players[
					props.auction.queue.players.current
				] === props.player ? (
					<>
						<button onClick={() => handleAuction("bet")}>Pump it Up</button>
						<button onClick={() => handleAuction("leave")}>Pasuj TO</button>
					</>
				) : (
					<p>
						{
							props.auction.queue.players.players[
								props.auction.queue.players.current
							]
						}
					</p>
				)}
			</div>
		</div>
	);
};
