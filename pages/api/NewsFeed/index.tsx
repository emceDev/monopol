import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

export async function setNewsFeed(game, news) {
	app
		.database()
		.ref("Games/" + game + "/newsFeed")
		.set({
			text: news,
		});
}
export async function getNews() {}
export default (req: NextApiRequest, res: NextApiResponse) => {
	console.log("requsets");
	const data = JSON.parse(req.body);
	const gameData = app.database().ref("Games/" + data.game + "/");
	return gameData.once("value").then((snapshot) => {
		console.log("solved");
		console.log(snapshot.val());
		return res.json({ data: snapshot.val() });
	});
};
