import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../../../config/firebase";

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	const gameData = app.database().ref("Games/" + data.game + "/cards");
	console.log("Obserwing Cards on:", data.game);
	return gameData.once("child_changed", (snapshot) => {
		console.log(" Card child_changed");
		console.log("key :>> ", snapshot.key);
		console.log(snapshot.val());
		gameData.off();

		return res.json({ key: snapshot.key, data: snapshot.val() });
	});
};
