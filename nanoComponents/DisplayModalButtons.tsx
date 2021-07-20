import { useEffect, useState } from "react";

async function transferCard(cardName, receiverRef, gameName) {
	const pay = await fetch("api/CardTransfer", {
		method: "POST",
		body: JSON.stringify({
			receiverName: receiverRef,
			gameName: gameName,
			cardName: cardName,
		}),
	});
	const res = await pay.json();
	console.log(res.response);
}
async function transferMoney(receiverRef, amount, gameName, playerName) {
	const pay = await fetch("api/MoneyTransfer", {
		method: "POST",
		body: JSON.stringify({
			giverRef: playerName,
			receiverRef: receiverRef,
			gameName: gameName,
			amount: amount,
		}),
	});
	console.log(receiverRef, amount, gameName, playerName);
	const res = await pay.json();
	console.log(res);
}
async function auction(card, game, player) {
	const auction = await fetch("api/Auction", {
		method: "POST",
		body: JSON.stringify({
			code: "set",
			game: game,
			card: card,
			player: player,
		}),
	});
	console.log(card, game);
	const res = await auction.json();
	console.log(res);
}
const TradeWithBankButtons = (props) => {
	const [error, setError] = useState(true);

	async function buy(data) {
		let buy = await fetch("api/Buy", {
			method: "POST",
			body: JSON.stringify({ data }),
		});
		const res = await buy.json();
		console.log(res);
		if (res.response === true) {
			transferCard(data.cardData.id, data.playerName, data.gameName);
			transferMoney(
				data.cardData.owner,
				data.cardData.price,
				data.gameName,
				data.playerName
			);
			setError(false);
		} else {
			setError(false);
		}
	}
	return (
		<div className="TradeWithBankButtons">
			{error ? (
				<div>
					{" "}
					<button
						onClick={() => {
							buy(props.data);
						}}
					>
						Kup
					</button>
					<button
						onClick={() => {
							auction(
								props.data.cardData,
								props.data.gameName,
								props.data.playerName
							);
						}}
					>
						Licytuj
					</button>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

async function homeAdd(gameName, playerName, cardData) {
	console.log(gameName, playerName, cardData);
	const pay = await fetch("api/HomeAdd", {
		method: "POST",
		body: JSON.stringify({
			playerName: playerName,
			gameName: gameName,
			cardData: cardData,
		}),
	});
	const res = await pay.json();
	console.log(res);
}

const SetUpHomes = (props) => {
	return (
		<div>
			<button
				onClick={() => {
					homeAdd(
						props.data.gameName,
						props.data.playerName,
						props.data.cardData
					);
				}}
			>
				ADDHOME
			</button>
			{/* api home++ */}
		</div>
	);
};

export const DisplayModalButtons = (props) => {
	return (
		<div className="DisplayModalButtons">
			{props.cardData.owner === "bank" &&
			props.cardData.whoIsOn?.includes(props.playerName) === true ? (
				<TradeWithBankButtons data={props} />
			) : null}
			{props.cardData.owner === props.playerName ? (
				<SetUpHomes data={props} />
			) : null}
		</div>
	);
};
