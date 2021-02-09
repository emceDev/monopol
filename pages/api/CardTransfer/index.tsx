import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

async function getData(ref) {
	console.log("getData   " + ref);
	return await app
		.database()
		.ref(ref)
		.once("value")
		.then((snap) => {
			return snap.val();
		});
}

async function updateData(updates) {
	console.log("updates");
	console.log(updates);
	let result;
	await app
		.database()
		.ref()
		.update(updates, (error) => {
			if (error) {
				return (result = error);
			} else {
				return (result = "zakutalizowano pomyślnie");
			}
		})
		.then((x) => result);
	return result;
}

async function modifyCards(playerCards, cardRef, type) {
	// true ===giver(seller) cards array
	if (type === true) {
		if ((playerCards.length === 1 || playerCards.length === null) === true) {
			return [];
		} else {
			return playerCards.filter((e) => e !== cardRef);
		}
	} else {
		if ((playerCards === null) === true) {
			console.log("modifycards1");
			console.log([cardRef]);
			return [cardRef];
		} else if (playerCards.includes(cardRef) !== true) {
			console.log("modifycards2");
			console.log([...playerCards, cardRef]);
			return [...playerCards, cardRef];
		}
	}
}
export async function setCardOwner(fullCardRef, receiverRef, gameRef, cardRef) {
	// console.log("fullCardRef   ", fullCardRef);
	// console.log(" gameRef   ", gameRef);
	// console.log("receiverRef   ", receiverRef);
	// console.log("cardRef   ", cardRef);
	let cardData = await getData(gameRef + "/cards/" + cardRef).then((x) => x);
	// wlassciciel karty
	let giverCardsRef = getData(
		gameRef + "/players/" + cardData.owner + "/cards/"
	);

	// karty banku
	let giverCards = await giverCardsRef.then((x) => {
		return modifyCards(x, cardRef, true);
	});
	// karrty po modufikacjy
	let receiverCardsRef = getData(
		gameRef + "/players/" + receiverRef + "/cards/"
	);
	let receiverCards = await receiverCardsRef.then((x) => {
		return modifyCards(x, cardRef, false);
	});
	var updates = {};
	updates[fullCardRef + "/owner/"] = receiverRef;
	updates[gameRef + "/players/" + receiverRef + "/cards"] = receiverCards;
	updates[gameRef + "/players/" + cardData.owner + "/cards"] = giverCards;
	updateData(updates);
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	const gameRef = "Games/" + data.gameName;
	const receiverRef = data.receiverName;
	const cardRef = "city" + data.cardName;
	const fullCardRef = gameRef + "/cards/" + cardRef;

	return setCardOwner(fullCardRef, receiverRef, gameRef, cardRef).then((x) =>
		res.json({ response: x })
	);
	// return getData(fullCardRef).then((x) => {
	// 	return setCardOwner(fullCardRef, receiverRef, gameRef, cardRef).then((x) =>
	// 		res.json({ response: x })
	// 	);
	// });
};
