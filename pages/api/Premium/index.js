import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

async function getNumber(featureName, type) {
	// type = like or buy click
	let updates = {};
	let numberOfClicks = await app
		.database()
		.ref("Premium/" + featureName + "/" + type)
		.once("value")
		.then((snap) => {
			console.log(snap.val());
			return snap.val();
		});
	updates["Premium/" + featureName + "/" + type] = numberOfClicks + 1;
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
async function sendComment(featureName, comment) {
	return await app
		.database()
		.ref("Premium/" + featureName + "/comments/")
		.push(comment)
		.then((x) => console.log(x));
}
export default async (req, res) => {
	if (req.method === "POST") {
		const data = JSON.parse(req.body);
		if (data.comment !== "") {
			console.log(data.comment);
			sendComment(data.title, data.comment);
		} else {
			getNumber(data.title, data.type);
			res.json(data);
		}
	}
};

// like, comment, buy,
//like,buy => get number of likes => set+1
// comment => push comments +1
