import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../../../config/firebase";
import { changeBalance } from "../MoneyTransfer/index";

async function getCities(data) {
	const ref = app.database().ref("Games/" + data.gameName + "/cards/");
	return await ref
		.orderByChild("country")
		.equalTo(data.cardData.country)
		.once("value")
		.then((snap) => snap.val());
}
async function addHome(data) {
	console.log(data);
	const ref = app
		.database()
		.ref(
			"Games/" + data.gameName + "/cards/city" + data.cardData.id + "/homes/"
		);
	let homeCount = await ref.once("value").then((snap) => snap.val());

	return await changeBalance(
		data.gameName,
		data.playerName,
		"bank",
		data.cardData.homeCost
	).then((x) => ref.set(homeCount + 1).then((x) => "successfully added home"));
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	getCities(data).then((x) => {
		let cards = Object.values(x);
		let filteredCards = cards.filter((card) => card.owner === data.playerName);
		let isOwner = filteredCards.length === cards.length;
		isOwner
			? addHome(data).then((x) => res.json({ code: x }))
			: res.json({ code: "Not owner of country" });
	});
};

// TRADE
// focus on field
// zloz oferte=>wysunely sie input>oferta w baze>onAccepted===true>Wykonaj oferte
