import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";
import { sendUserDevice } from "../SendDevice/index";
async function loginHistory(key, date) {
	return await app
		.database()
		.ref("Players/" + key + "/loginHistory/")
		.push(date);
}
async function checkForEntry(ref, data) {
	const res = await app
		.database()
		.ref(ref)
		.once("value")
		.then((snap) => {
			let x = snap.val();
			let players = Object.values(x);
			return players.find(
				(x) => x.name === data.name && x.password === data.password
			);
		});
	return await res;
}

export default (req, res) => {
	let date = new Date().toString();
	const data = JSON.parse(req.body).data;
	const reference = "Players/";
	// let date = toString(new Date());
	let x = checkForEntry(reference, data);
	return x.then((x) => {
		delete x.password;
		loginHistory(x.key, date);
		sendUserDevice(x.key, data.device);
		return res.json({ response: x });
	});
};
