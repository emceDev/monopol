import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

export async function setNewsFeed(game, news) {
	console.log("NEWSSSSS");
	console.log(news);
	let newsHistory = await app
		.database()
		.ref("Games/" + game + "/newsFeed/")
		.once("value")
		.then((snap) => {
			return snap.val();
		});
	app
		.database()
		.ref("Games/" + game + "/newsFeed/")
		.set([...newsHistory, news]);
}
