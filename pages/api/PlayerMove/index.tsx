import next, { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";
import { changeBalance } from "../MoneyTransfer";
import { setNewsFeed } from "../NewsFeed";
import { onChangedField } from "../OnChangedField";
import { moveQueue } from "../Queue/index";

async function updateCurrentFieldInPlayers(data) {
	return await app
		.database()
		.ref(
			"Games/" +
				data.gameName +
				"/players/" +
				data.playerName +
				"/currentField/"
		)
		.set(data.nextField)
		.then((x) => x);
}
async function getCard(gameName, cardRef, ref) {
	return await app
		.database()
		.ref("Games/" + gameName + "/cards/city" + cardRef + ref)
		.once("value")
		.then((snap) => {
			return snap.val();
		});
}
async function setData(game, data, cardRef) {
	return await app
		.database()
		.ref("Games/" + game + "/cards/city" + cardRef + "/whoIsOn")
		.set(data)
		.then((x) => x);
}
async function updateNext(player, game, nextCard, nextF) {
	if (nextCard === null) {
		return setData(game, [player], nextF);
	} else {
		let newArr = [...nextCard, player];
		return setData(game, newArr, nextF);
	}
}
async function updatePrevious(player, game, previousCard, previousF) {
	if ((previousCard === null) === true) {
		return setData(game, [], previousF);
	} else {
		let newArr = previousCard.filter((e) => e !== player);
		return setData(game, newArr, previousF);
	}
}
async function modifyCards(player, game, previousF, nextF) {
	let previousCard = await getCard(game, previousF, "/whoIsOn").then((x) => x);
	let nextCard = await getCard(game, nextF, "/whoIsOn").then((x) => x);

	updatePrevious(player, game, previousCard, previousF).then((x) =>
		updateNext(player, game, nextCard, nextF).then((x) => x)
	);
}
export async function movePlayer(data) {
	let cardsUpdate = modifyCards(
		data.playerName,
		data.gameName,
		data.previousField,
		data.nextField
	);

	let changed = await cardsUpdate
		.then((x) => updateCurrentFieldInPlayers(data))
		.then((x) => getCard(data.gameName, data.nextField, ""))
		.then((card) => onChangedField(data, card))
		.then((x) => {
			setNewsFeed(data.gameName, x.newsFeed);
			return x;
		});

	return changed;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	if (data.nextField < data.previousField) {
		changeBalance(data.gameName, "bank", data.playerName, 200);
	}
	return movePlayer(data).then((x) => {
		moveQueue(data.gameName);
		return res.json(x);
	});
};
