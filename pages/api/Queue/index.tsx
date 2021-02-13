import next, { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";
import { changeBalance } from "../MoneyTransfer";
import { setNewsFeed } from "../NewsFeed";
import { onChangedField } from "../OnChangedField";

const players = async () => {
	return await app
		.database()
		.ref("Games/123/players")
		.once("value")
		.then((snap) => snap.val());
};
export async function queue(game) {
	console.log("queue");
	return await app
		.database()
		.ref("Games/" + game + "/queue")
		.once("value")
		.then((snap) => snap.val());
}

async function checkJail(queueData, game, tick) {
	if (queueData.jail[tick] !== undefined) {
		let updates = {};
		updates["Games/" + game + "/queue/players/"] = [
			...queueData.players,
			...queueData.jail[tick],
		];
		console.log("FREEED");
		updateQueue(updates);
	}
}
export async function placeInJail(game, player) {
	console.log("placin");
	let queueData = await queue(game).then((x) => x);
	let tick = Number(queueData.tick + 4);
	let updates = {};
	let jail = queueData.jail?.tick;
	let players = queueData.players;
	let updated = players.filter((x) => x !== player);
	console.log("updlalsdlsdl");
	console.log(jail);
	// console.log("jail" + jail?.[tick]);
	updates["Games/" + game + "/queue/jail/" + tick] =
		jail === null || jail === undefined ? [player] : [...jail, player];
	updates["Games/" + game + "/queue/players/"] = updated;
	return updateQueue(updates);
}
async function updateQueue(updates) {
	console.log("updateQueue");
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
export async function moveQueue(game) {
	let queueData = await queue(game).then((x) => x);
	let current = queueData.current;
	let max = queueData.players.length;
	let updated;
	let tick = queueData.tick;

	// console.log(max);
	// console.log(current);

	if (current < max - 1) {
		updated = current + 1;
		tick = tick + 1;
	} else {
		tick = tick + 1;
		updated = 0;
	}

	let updates = {};
	updates["Games/" + game + "/queue/current"] = updated;
	updates["Games/" + game + "/queue/tick"] = tick;

	// if tick === jai tick move player back to queue

	queueData.jail !== undefined && queueData.jail !== null
		? checkJail(queueData, game, tick)
		: null;

	return updateQueue(updates);

	// app
	// 	.database()
	// 	.ref("Games/" + game + "/queue/current/")
	// 	.set(updated);
	// if()
}
export const addToQueue = async (player, game) => {
	let previousQueue = await queue(game).then((x) => x.players);
	console.log("add to queue");
	// console.log(previousQueue);
	// console.log(game);
	// console.log(player);
	app
		.database()
		.ref("Games/" + game + "/queue/players/")
		.set([...previousQueue, player]);
};
