import { useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { tradeAtom, mainPlayerData, mainGameData } from "../state/atom";
import { Offer } from "./Offer";

export const Trade = (props) => {
	const [playerAtom, setPlayerAtom] = useRecoilState(mainPlayerData);
	const gameData = useRecoilValue(mainGameData);
	const [receiver, setReceiver] = useState(null);
	const [trade, setTrade] = useRecoilState(tradeAtom);
	const [offerMoney, setOfferMoney] = useState(0);
	const [demandMoney, setDemandMoney] = useState(0);
	const [demandsArr, setDemandsArr] = useState([]);
	const [offerArr, setOfferArr] = useState([]);
	const [show, setShow] = useState(false);
	const [error, setError] = useState("");
	useEffect(() => {
		console.log(demandsArr);

		// console.log(x);
	}, [demandsArr]);
	function listen() {
		setShow(!show);
	}

	async function sendOffer() {
		// setShow(false);
		console.log("oferta sent");
		const res1 = await fetch("api/SetTradeOffer", {
			method: "POST",
			body: JSON.stringify({
				gameName: gameData.name,
				offer: {
					giver: playerAtom.name,
					receiver: receiver,
					demands: { money: demandMoney, cards: demandsArr[0]?.split(",") },
					offerings: { money: offerMoney, cards: offerArr[0]?.split(",") },
				},
			}),
		});
		const res2 = await res1.json();
		setError(res2.x);
	}
	return (
		<div className="Trade">
			{show ? (
				<>
					{error !== "" ? <p>{error}</p> : <p>Handluj</p>}
					<div>
						<div className="TradeContainer">
							<div>
								<p>numery pól oddziel przecinkami, bez spacji</p>
								<input
									type="number"
									placeholder="Ile pieniędzy chcesz"
									onChange={(e) => {
										setDemandMoney(Number(e.target.value));
									}}
								/>
								<input
									placeholder="Pola które chcesz"
									onChange={(e) => {
										setDemandsArr([e.target.value]);
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
									type="number"
									placeholder="Ile pieniędzy oferujesz"
									onChange={(e) => {
										setOfferMoney(Number(e.target.value));
									}}
								/>
								<input
									placeholder="Pola które oferujesz"
									onChange={(e) => {
										setOfferArr([e.target.value]);
									}}
								/>
								<div>
									{offerArr?.map((x) => {
										return x;
									})}
								</div>
							</div>
						</div>
					</div>

					<button onClick={() => (show ? sendOffer() : listen())}>
						wyślij oferte
					</button>
				</>
			) : trade?.[playerAtom.name] !== undefined ? (
				<Offer trade={trade[playerAtom.name]} gameName={gameData.name} />
			) : (
				<p>Brak Ofert</p>
			)}
			<button onClick={() => setShow(!show)}>
				{!show ? "Stwórz ofertę" : "Sprawdź oferty"}
			</button>
		</div>
	);
};
