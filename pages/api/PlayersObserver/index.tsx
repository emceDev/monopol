import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../../../config/firebase";

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	const gameData = app.database().ref("Games/" + data.game + "/players");
	console.log("Obserwing Players on:", data.game);
	return gameData.once("child_changed", (snapshot) => {
		console.log(" player child_changed");
		console.log("key :>> ", snapshot.key);
		gameData.off();
		return res.json({ key: snapshot.key, data: snapshot.val() });
	});
};
