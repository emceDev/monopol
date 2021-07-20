import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
	const cardData = JSON.parse(req.body).data.cardData;
	const player = JSON.parse(req.body).data.playerName;
	const game = JSON.parse(req.body).data.gameName;
	console.log("TEST");
	console.log(JSON.parse(req.body));
	// const gameRef = "Games/" + data.gameName;
	// const receiverRef = data.receiverName;
	// const cardRef = "city" + data.cardName;
	// const fullCardRef = gameRef + "/cards/" + cardRef;
	return res.json({ response: req.body });
};
