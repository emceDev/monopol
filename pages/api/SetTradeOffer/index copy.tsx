import { ifError } from "assert";
import next, { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

async function checkCards(game, player, playerCards, cards) {
	return await Promise.all(
		cards.map(async (number) => {
			return await app
				.database()
				.ref("Games/" + game + "/cards/city" + number)
				.once("value")
				.then((snap) => {
					if (snap.val() === null) {
						return [false, "no field like that " + number];
					} else {
						if (snap.val().owner !== player) {
							return [false, player + " is not owner of: " + snap.val().name];
						} else {
							return [true, "to pole nadaje sie do handlu"];
						}
					}
				});
		})
	);
}

function checkMoney(player, money) {
	if (player.balance < money) {
		return [false, "player has no balance to do that trade"];
	} else {
		return [true, "gracz ma wystarczająco pieniędzy"];
	}
}
// returns [true/false, 'code explantation']

async function checkDemands(game, player, items) {
	let demandsResponse = [];
	let code = false;
	console.log("checking demands");
	return app
		.database()
		.ref("Games/" + game + "/players/" + player)
		.once("value")
		.then(async (snap) => {
			let posessions = snap.val();
			if (items.money !== undefined && items.money > 0) {
				console.log("moneycheck");
				demandsResponse.push(checkMoney(posessions, items.money));
			} else {
				console.log("no money in stake");
			}
			if (items.cards === undefined) {
				console.log("no cards");
			} else if (items.cards !== undefined && items.cards.length !== 0) {
				await checkCards(game, player, posessions.cards, items.cards).then(
					(x) => demandsResponse.push(x)
				);
			}
			// console.log(demandsResponse[0][0]);

			if (code === undefined) {
				return [true, "Pomyślnie wysłano Ofertę"];
			} else {
				code = demandsResponse[0].find((el) => el[0] === false);
				return code;
			}
		});
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	// console.log(data);
	console.log("asked");
	return checkDemands(
		data.gameName,
		data.offer.receiver,
		data.offer.demands
	).then((requirement) => {
		console.log(requirement);
		if (requirement[0] !== false) {
			console.log(requirement);
			console.log("Receiver has things");
			// checking if oferer has all things
			return checkDemands(
				data.gameName,
				data.offer.giver,
				data.offer.offerings
			).then((requirement) => {
				console.log(requirement);
				if (requirement[0] !== false) {
					console.log(requirement);
					console.log("Oferer :P has things too");
					return res.json({ requirement });
				} else {
					console.log("oferer is broke");
					return res.json({ requirement });
				}
			});
		} else {
			console.log("receiver doesn't have");
			return res.json({ requirement });
		}
	});
	// app
	// 	.database()
	// 	.ref("Games/" + data.gameName + "/offers/" + data.offer.receiver)
	// 	.set(data.offer);
	// return res.json({ response: checkDemands });
};

// offer: {
// 	giver: playerAtom.name,
// 	receiver: receiver,
// 	demands: { money: demandMoney, cards: demandsArr },
// 	offerings: { money: offerMoney, cards: offerArr },
// },
