import next, { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	// console.log(data);
	app
		.database()
		.ref("Games/" + data.gameName + "/offers/" + data.offer.receiver)
		.set(data.offer);
	return res.json({ response: data });
};
