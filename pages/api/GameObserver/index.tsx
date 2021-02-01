import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

export default (req: NextApiRequest, res: NextApiResponse) => {
	// console.log("requsets");
	const data = JSON.parse(req.body);
	const gameData = app.database().ref("Games/" + data.game + "/");
	//("Obserwing on:", data.game);
	return gameData.on("child_changed", () => {
		// console.log("middl");
		gameData.off();
		return gameData.once("value").then((snapshot) => {
			// console.log("solved");
			return res.json({ data: snapshot.val() });
		});
	});
};
