import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";
import { getBalance } from "../MoneyTransfer/index";

async function getCardOwner(game, card) {
	console.log("=====GETcARDoWner card game=====");
	console.log(card);

	console.log(game);
	return await app
		.database()
		.ref("Games/" + game + "/cards/city" + card + "/owner")
		.once("value")
		.then((snap) => {
			console.log(snap.val());
			return snap.val();
		});
}
export default (req: NextApiRequest, res: NextApiResponse) => {
	const cardData = JSON.parse(req.body).data.cardData;
	const player = JSON.parse(req.body).data.playerName;
	const game = JSON.parse(req.body).data.gameName;
	console.log(JSON.parse(req.body).data.cardData);
	getCardOwner(game, cardData.id).then((x) => console.log("solved"));
	return getBalance(game, player).then((x) => {
		console.log("=====.BUY.=====");
		if (x > cardData.price) {
			return getCardOwner(game, cardData.id).then((owner) => {
				if (owner === "bank") {
					return res.json({ response: true });
				} else {
					return res.json({ response: false });
				}
			});
		} else {
			return res.json({ response: false });
		}
	});
};
