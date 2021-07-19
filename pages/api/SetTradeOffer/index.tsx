import { ifError } from "assert";
import next, { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

// check whether offered card is in possesion of sender
// check wheter requested card is in possesion  of receiver
// check wether receiver has money
// check wether sender has money
// all good send
// one bad return error
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
// returns [true/false, 'code talk']
function checkMoney(player, money) {
	if (player.balance < money) {
		return [false, "player has no balance to do that trade"];
	} else {
		return [true, "gracz ma wystarczająco pieniędzy"];
	}
}

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
			if (items.money === 0) {
				// dont check moeny
			} else {
				demandsResponse.push(checkMoney(posessions, items.money));
				console.log("moneycheck");
				console.log(demandsResponse);
			}
			if (items.cards === undefined) {
				// dont check cards
			} else if (items.cards !== undefined && items.cards.length !== 0) {
				await checkCards(game, player, posessions.cards, items.cards).then(
					(x) => demandsResponse.push(x)
				);
			}
			// console.log(demandsResponse[0][0]);
			code = demandsResponse[0].find((el) => el[0] === false);
			if (code === undefined) {
				return [true, "Pomyślnie wysłano Ofertę"];
			} else {
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
