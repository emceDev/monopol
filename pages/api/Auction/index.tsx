import next, { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";
import { cardsAtom } from "../../../state/atom";
import { queue } from "../Queue";
import { changeBalance } from "../MoneyTransfer";
import { setCardOwner } from "../CardTransfer";

async function getAuction(game) {
	return await app
		.database()
		.ref("Games/" + game + "/auction/")
		.once("value")
		.then((snap) => snap.val());
}
async function leaveAuction(game, player) {
	let queueData = await getAuction(game).then((x) => x);
	let updates = {};
	let players = queueData.queue.players.players;
	let updated = players.filter((x) => x !== player);
	updates["Games/" + game + "/auction/queue/players/players"] = updated;
	nextPlayer(game);
	updateAuction(updates);
}
async function bet(game, player, amount) {
	let updates = {};
	updates["Games/" + game + "/auction/price"] = amount;
	updates["Games/" + game + "/auction/player"] = player;
	updateAuction(updates);
	nextPlayer(game);
}

async function nextPlayer(game) {
	let queueData = await getAuction(game).then((x) => x);
	let current = queueData.queue.players.current;
	let max = queueData.queue.players.players.length;
	let updated;
	let tick = queueData.queue.players.tick;
	console.log(queueData);
	// console.log(max);
	// console.log(current);
	if (max === 1) {
		changeBalance(game, queueData.player, "bank", queueData.price);
		setCardOwner(
			"Games/" + game + "/cards/city" + queueData.card.id,
			queueData.player,
			"Games/" + game,
			"city" + queueData.card.id
		);
		let updates = {};
		updates["Games/" + game + "/auction/"] = null;
		updateAuction(updates);
	} else {
		if (current < max - 1) {
			updated = current + 1;
			tick = tick + 1;
		} else {
			tick = tick + 1;
			updated = 0;
		}
	}

	console.log("next" + updated);
	let updates = {};
	updates["Games/" + game + "/auction/queue/players/current"] = updated;
	updates["Games/" + game + "/auction/queue/players/tick"] = tick;
	updateAuction(updates);
}

async function updateAuction(updates) {
	console.log("updateQueue");
	console.log(updates);
	return await app
		.database()
		.ref()
		.update(updates, (error) => {
			if (error) {
				return error;
			} else {
				return null;
			}
		})
		.then((x) => console.log(x));
}

async function setAuction(data) {
	let players = await queue(data.game).then((x) => x);
	console.log(queue);
	// current + 1

	app
		.database()
		.ref("Games/" + data.game + "/auction/")
		.set({
			card: data.card,
			price: (data.card.price / 1.5).toFixed(0),
			player: data.player,
			queue: { players: players },
		});
}
export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	console.log(data);
	res.json({ response: "auction" });
	if (data.code === "set") {
		console.log(data);
		setAuction(data);
	} else if (data.code === "leave") {
		leaveAuction(data.game, data.player);
	} else if (data.code === "bet") {
		bet(data.game, data.player, data.amount);
	} else if (data.code === "next") {
		nextPlayer(data.game);
	}
};
