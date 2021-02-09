import { useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { tradeAtom, mainPlayerData, mainGameData } from "../state/atom";
import { Offer } from "./Offer";

export const Trade = (props) => {
	const [playerAtom, setPlayerAtom] = useRecoilState(mainPlayerData);
	const gameData = useRecoilValue(mainGameData);
	const [receiver, setReceiver] = useState(null);
	const [trade, setTrade] = useRecoilState(tradeAtom);
	const [offerMoney, setOfferMoney] = useState(null);
	const [demandMoney, setDemandMoney] = useState(null);
	const [demandsArr, setDemandsArr] = useState(null);
	const [offerArr, setOfferArr] = useState([]);
	const [show, setShow] = useState(false);
	useEffect(() => {
		console.log(demandsArr);
	}, [demandsArr]);
	function listen() {
		setShow(!show);
		// join two in one object and push to the server
		const el = document.getElementsByClassName("PlayersList")[0];
		el.addEventListener("click", (e) => {
			if (e.target.className === "PlayersListCard") {
				e.target.style.border = "1px solid";
				let owner = e.target.parentElement.parentElement.id;
				if (playerAtom.name === owner) {
					setOfferArr((offerArr) => [...offerArr, e.target.id]);
					console.log("daj pole", e.target.id);
				} else {
					setReceiver(owner);
					setDemandsArr((demandsArr) => [...demandsArr, e.target.id]);
					console.log("wez pole" + e.target.id);
				}
			}
		});
	}
	function log() {
		console.log(gameData);
	}
	async function sendOffer() {
		setShow(false);
		const res1 = await fetch("api/SetTradeOffer", {
			method: "POST",
			body: JSON.stringify({
				gameName: gameData.name,
				offer: {
					giver: playerAtom.name,
					receiver: receiver,
					demands: { money: demandMoney, cards: demandsArr },
					offerings: { money: offerMoney, cards: offerArr },
				},
			}),
		});
		const res2 = await res1.json();
		console.log(res2);
	}
	return (
		<div>
			{/* <button onClick={() => log()}>LOG meeeee</button> */}
			{show ? (
				<div>
					<div className="TradeContainer" style={{ display: "flex" }}>
						<div>
							<p>żądanie</p>
							<input
								placeholder="Ile chcesz"
								onChange={(e) => {
									setDemandMoney(e.target.value);
								}}
							/>
							<input
								placeholder="od kogo"
								onChange={(e) => {
									setReceiver(e.target.value);
								}}
							/>
							<div>{demandsArr?.map((x) => x)}</div>
						</div>
						<div>
							<p>Oferta</p>
							<input
								placeholder="Ile zapłacisz"
								onChange={(e) => {
									setOfferMoney(e.target.value);
								}}
							/>
							<div>
								{offerArr.map((x) => {
									return x;
								})}
							</div>
						</div>
					</div>
				</div>
			) : null}
			<button onClick={() => (show ? sendOffer() : listen())}>
				{show ? "wyślij" : "rozwiń"}
			</button>
			{trade?.[playerAtom.name] !== undefined ? (
				<Offer trade={trade[playerAtom.name]} />
			) : (
				console.log("nemore")
			)}
		</div>
	);
	return <div>trading here</div>;
};
