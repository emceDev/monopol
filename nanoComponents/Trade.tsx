import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { tradeAtom, mainPlayerData, playersAtom } from "../state/atom";

export const Trade = (props) => {
	const [playerAtom, setPlayerAtom] = useRecoilState(mainPlayerData);
	const [receiver, setReceiver] = useState(null);
	const [trade, setTrade] = useRecoilState(tradeAtom);
	const [offerMoney, setOfferMoney] = useState(null);
	const [demandMoney, setDemandMoney] = useState(null);
	const [demandsArr, setDemandsArr] = useState([]);
	const [offerArr, setOfferArr] = useState([]);

	useEffect(() => {
		console.log(demandsArr);
	}, [demandsArr]);
	function listen() {
		// join two in one object and push to the server

		const el = document.getElementsByClassName("PlayersList")[0];
		el.addEventListener("click", (e) => {
			if (e.target.className === "PlayersListCard") {
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

	async function sendOffer() {
		const res1 = await fetch("api/SetTradeOffer", {
			method: "POST",
			body: JSON.stringify({
				giver: playerAtom.name,
				receiver: receiver,
				demands: { money: demandMoney, cards: demandsArr },
				offerings: { money: offerMoney, cards: offerArr },
			}),
		});
		const res2 = await res1.json();
		console.log(res2);
	}
	return (
		<div onClick={() => listen()}>
			OpenTrade
			<input
				placeholder="Demandedn Money Here"
				onChange={(e) => {
					setDemandMoney(e.target.value);
				}}
			/>
			<div>
				{offerArr.map((x) => {
					return x;
				})}
			</div>
			<div>
				Card List to give
				<input
					placeholder="Money Here"
					onChange={(e) => {
						setOfferMoney(e.target.value);
					}}
				/>
				{demandsArr.map((x) => x)}
			</div>
			<button onClick={() => sendOffer()}>Send offer</button>
		</div>
	);
};
