import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

export async function getBalance(gameRef, playerRef) {
	return await app
		.database()
		.ref("Games/" + gameRef + "/players/" + playerRef + "/balance/")
		.once("value")
		.then((snap) => {
			return snap.val();
		});
}
export async function changeBalance(gameRef, giverRef, receiverRef, amount) {
	console.log("MONEYTRANSFER");
	console.log(gameRef, giverRef, receiverRef, amount);
	let giverBalance = await getBalance(gameRef, giverRef).then(
		(balance) => balance - amount
	);
	let receiverBalance = await getBalance(gameRef, receiverRef).then(
		(balance) => amount + balance
	);
	var updates = {};
	updates["Games/" + gameRef + "/players/" + giverRef + "/balance/"] =
		giverBalance;
	updates["Games/" + gameRef + "/players/" + receiverRef + "/balance/"] =
		receiverBalance;
	// console.log(updates);
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

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);

	const giverRef = data.giverRef;
	const receiverRef = data.receiverRef;
	const amount = data.amount;
	const gameName = data.gameName;

	return changeBalance(gameName, giverRef, receiverRef, amount).then((x) => {
		return res.json({ response: x });
	});
};
