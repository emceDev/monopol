import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	const gameData = app.database().ref("Games/" + data.game + "/");

	return gameData.once("value").then((snapshot) => {
		console.log("solved");
		// console.log(snapshot);
		return res.json({ data: snapshot.val() });
	});
};
