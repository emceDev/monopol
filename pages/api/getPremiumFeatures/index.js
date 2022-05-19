import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

async function getPremiumFeatures() {
	return await app
		.database()
		.ref("Premium/")
		.once("value")
		.then((snap) => {
			// console.log(snap.val());
			return snap.val();
		});
}

export default async (req, res) => {
	let features = await getPremiumFeatures();
	// let keys = Object.keys(features);
	let arr = Object.values(features);
	// console.log(arr);
	// console.log(await getPremiumFeatures());
	res.json(arr);
};
