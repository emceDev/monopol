import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";
import { setCardOwner } from "../CardTransfer/index";
import { changeBalance } from "../MoneyTransfer/index";
async function handleCards(giver, receiver, demandsCards, offeredCards, game) {
	console.log("card handler");
	let i = 0;
	let z = 0;
	console.log("demandsCards", demandsCards);

	if (demandsCards !== undefined && demandsCards !== null) {
		while (i < demandsCards.length) {
			console.log("demandsCards[i]", demandsCards[i]);
			await setCardOwner(
				"Games/" + game + "/cards/city" + demandsCards[i],
				giver,
				"Games/" + game,
				"city" + demandsCards[i]
			).then((x) => i++);
		}
	}
	if (offeredCards !== undefined && offeredCards !== null) {
		while (z < offeredCards.length) {
			console.log("offeredCards[z]   ", offeredCards[z]);
			await setCardOwner(
				"Games/" + game + "/cards/city" + offeredCards[z],
				receiver,
				"Games/" + game,
				"city" + offeredCards[z]
			).then((x) => z++);
		}
	}
}
async function handleMoney(giver, receiver, offeredMoney, demandsMoney, game) {
	offeredMoney
		? changeBalance(game, giver, receiver, offeredMoney)
		: console.log("no monies");
	demandsMoney
		? changeBalance(game, receiver, giver, demandsMoney)
		: console.log("no monies in demand");
}
export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	console.log(data);
	let giver = data.data.giver;
	let receiver = data.data.receiver;
	let game = data.gameName;
	let demandsMoney = data.data.demands.money;
	let offeredMoney = data.data.offerings.money;
	let demandsCards = data.data.demands.cards;
	let offeredCards = data.data.offerings.cards;

	if (data.x === true) {
		// console.log(data);

		handleCards(giver, receiver, demandsCards, offeredCards, game);
		handleMoney(giver, receiver, offeredMoney, demandsMoney, game);
		app
			.database()
			.ref("Games/" + game + "/offers/" + receiver)
			.remove();
		return res.json({ response: data });
	} else if (data.x === false) {
		app
			.database()
			.ref("Games/" + game + "/offers/" + receiver)
			.remove();
		return res.json({ response: data });
		//erase trade
	} else {
		return res.json({ response: data });
	}
};
