import next, { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

async function getInventory(game, player) {
	return await app
		.database()
		.ref("Games/" + game + "/players/" + player)
		.once("value")
		.then((snap) => {
			return snap.val();
		});
}
function moneyCheck(
	giver,
	demanded,
	giverName,
	receiver,
	offered,

	receiverName
) {
	if (demanded > receiver) {
		return false;
	}
	if (offered > giver) {
		return false;
	} else return true;
}
// FIX IT returning bad things fucking up whole ting
function checkInvCard(array, player) {
	let arrFound = [];
	let arrNotFound = [];
	if (array !== undefined) {
		array.map((demandedEl) => {
			player.filter((element) =>
				element.slice(4) === demandedEl
					? arrFound.push(true)
					: arrNotFound.push(false)
			);
		});
		console.log("====CHECKINVCARD====");
		console.log(player, array);
		console.log(arrFound.length === array.length);

		return arrFound.length === array.length ? true : false;
	}
}
function cardCheck(
	receiver,
	demanded,
	receiverName,
	giver,
	offered,
	giverName
) {
	let checkCard = [];
	if (offered !== undefined) {
		console.log("=======GIVER OFFERED=======");
		console.log(giver);
		console.log(offered);
		checkCard.push(checkInvCard(offered, giver));
	} else {
		// no cards offered
	}
	if (demanded !== undefined) {
		console.log("=======RECEIVER DEMANDED======");
		console.log(receiver);
		console.log(demanded);
		checkCard.push(checkInvCard(demanded, receiver));
	} else {
		// no cards offered
	}
	console.log("=====CARDCHECKRESPONSE====");
	console.log(checkCard);
	// console.log(
	// 	checkCard.find((el) =>
	// 		el !== false ? console.log("jset") : console.log("niema")
	// 	)
	// );
	if (checkCard.find((el) => (el === false ? true : false)) === undefined) {
		return true;
	} else {
		return false;
	}
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	let response = [];
	let receiverInventory;
	let giverInventory;
	function Inventory(balance, cards) {
		(this.balance = balance), (this.cards = cards);
	}
	return getInventory(data.gameName, data.offer.giver)
		.then((x) => {
			if (x !== null) {
				giverInventory = new Inventory(x.balance, x.cards);
				console.log("giverInventory");
				console.log(giverInventory);
			}
		})
		.then(() =>
			getInventory(data.gameName, data.offer.receiver).then((x) => {
				console.log(x);
				if (x !== null) {
					receiverInventory = new Inventory(x.balance, x.cards);
					console.log("=====INVENTORIES=======");
					console.log("reveiverInventory");
					console.log(receiverInventory);
					console.log("=====END=======");

					response.push(true);
				} else {
					response[0] = false;
				}
			})
		)
		.then(() => {
			if (response[0] === false) {
				response.push(false);
			} else {
				response.push(
					moneyCheck(
						receiverInventory.balance,
						data.offer.demands.money,
						data.offer.receiver,
						giverInventory.balance,
						data.offer.offerings.money,
						data.offer.giver
					)
				);
			}
		})
		.then(() => {
			if (response[0] === false) {
				response.push(false);
			} else {
				response.push(
					cardCheck(
						receiverInventory.cards,
						data.offer.demands.cards,
						data.offer.receiver,
						giverInventory.cards,
						data.offer.offerings.cards,
						data.offer.giver
					)
				);
			}
		})
		.then((x) => {
			console.log("========RESPONSE!========");
			console.log(response);
			if (response[0] === false) {
				return res.json({
					x: "Sprawdź nazwę użytkownika, być może wkradł się błąd gramatyczny",
				});
			} else if (response[1] === false) {
				return res.json({
					x: "Sprawdź kwoty, być może kogoś nie stać na transakcje",
				});
			} else if (response[2] === false) {
				return res.json({
					x: "Ktoś nie jest właścicielem kart wpisanych w pola handlu",
				});
			} else {
				app
					.database()
					.ref("Games/" + data.gameName + "/offers/" + data.offer.receiver)
					.set(data.offer);
				return res.json({
					x: "Pomyślnie wysłano ofertę, poczekaj na odpowiedź",
				});
			}
		});
	return res.json("Pomyślnie wysłano ofertę, poczekaj na odpowiedź");
	// check balance of giver
	// receiverInventory.money
	// check balance of receiver

	// check cards of giver
	// checkCards(data.gameName, data.offer.giver, data.offer.demands.cards).then(
	// 	(x) => console.log(x)
	// );

	// // check cards of receiver
	// checkCards(
	// 	data.gameName,
	// 	data.offer.receiver,
	// 	data.offer.offerings.cards
	// ).then((x) => console.log(x));

	// console.log(data);
};

// offer: {
// 	giver: playerAtom.name,
// 	receiver: receiver,
// 	demands: { money: demandMoney, cards: demandsArr },
// 	offerings: { money: offerMoney, cards: offerArr },
// },
//
// app
// 	.database()
// 	.ref("Games/" + data.gameName + "/offers/" + data.offer.receiver)
// 	.set(data.offer);
// return res.json({ response: checkDemands });

// get inventory
// check if owner of cards
// check money
// ====goood====
// get 2nd inventory
