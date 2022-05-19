import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

// device reporting system is hotwired in my opinion
// this happened due to lack of time for forecasting next steps
// it took me less than 15 mins to do this sytem sorry :<

async function sendDevice(type) {
	let updates = {};
	let numberOfDevices = await app
		.database()
		.ref("Metrics/Feedback/devices/" + type)
		.once("value")
		.then((snap) => {
			return snap.val();
		});
	updates["Metrics/Feedback/devices/" + type] = numberOfDevices + 1;
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
export async function sendUserDevice(userKey, device) {
	let updates = {};
	let numberOfDevices = await app
		.database()
		.ref("Players/" + userKey + "/devices/" + device)
		.once("value")
		.then((snap) => {
			snap.val() === null ? 0 : snap.val();
			return snap.val();
		});
	// console.log("====here====");
	// console.log(numberOfDevices);
	// console.log("====END====");
	updates["Players/" + userKey + "/devices/" + device] = numberOfDevices + 1;
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
export default async (req, res) => {
	if (req.method === "POST") {
		const data = req.body;
		sendDevice(data.device);
		res.json(data);
	}
};
