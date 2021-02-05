import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

export async function setNewsFeed(game, news) {
	console.log("NEWSSSSS");
	console.log(news);
	app
		.database()
		.ref("Games/" + game + "/newsFeed/")
		.set({
			text: news,
		});
}
