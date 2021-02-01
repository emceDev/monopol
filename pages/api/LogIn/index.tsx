import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../../../config/firebase";

async function checkForEntry(ref, data) {
	const res = await app
		.database()
		.ref(ref)
		.once("value")
		.then((snap) => {
			let x = snap.val();
			let players = Object.values(x);
			return players.find(
				(x: any) => x.name === data.name && x.password === data.password
			);
		});
	return await res;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body).data;
	const reference = "Players/";

	let x = checkForEntry(reference, data);
	return x.then((x) => {
		return res.json({ response: x });
	});
};
