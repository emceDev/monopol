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
const TradeWithBankButtons = (props) => {
	return (
		<div>
			<button
				onClick={() => {
					transferCard(
						props.data.cardData.id,
						props.data.playerName,
						props.data.gameName
					);
					transferMoney(
						props.data.cardData.owner,
						props.data.cardData.price,
						props.data.gameName,
						props.data.playerName
					);
				}}
			>
				Yes
			</button>
			<button>No</button>
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
		<div>
			<TradeWithBankButtons data={props} />
			<SetUpHomes data={props} />
		</div>
	);
};
