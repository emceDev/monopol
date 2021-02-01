import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../../../config/firebase";

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	const reference = "Games/";
	const game = data.game;
	const playerRef = data.player;
	return app
		.database()
		.ref(reference + "/" + game + "/players/" + playerRef)
		.remove((x) => {
			// app.database().ref("Games/1").off();
			return res.json({ response: "LeftGame" });
		});
};
