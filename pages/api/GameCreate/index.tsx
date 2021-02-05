import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";
import { cardsAtom } from "../../../state/atom";

async function checkForDuplicate(ref, data) {
	return await app
		.database()
		.ref(ref + data.name)
		.once("value")
		.then((snap) => {
			let x = snap.val();
			return x === null ? false : true;
		});
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	const reference = "Games/";
	const gameModel = {
		name: data.name,
		players: {
			bank: {
				name: "bank",
				balance: 10000,
				cards: [
					"city1",
					"city2",
					"city3",
					"city4",
					"city5",
					"city6",
					"city7",
					"city8",
					"city9",
					"city10",
					"city11",
					"city12",
					"city13",
					"city14",
					"city15",
					"city16",
					"city17",
					"city18",
					"city19",
					"city20",
					"city21",
					"city22",
					"city23",
					"city24",
					"city25",
					"city26",
					"city27",
					"city28",
					"city29",
					"city30",
					"city31",
					"city32",
					"city33",
					"city34",
					"city35",
					"city36",
					"city37",
					"city38",
					"city39",
					"city40",
				],
				color: "#8c8cc9cf",
			},
			[data.creator]: {
				key: data.key,
				balance: 3000,
				name: data.creator,
				cards: [],
				color: data.color,
				currentField: 1,
			},
		},
		cards: data.cards,
		newsFeed: {
			text: "No news yet",
		},
	};
	gameModel.cards.city1.whoIsOn = [data.creator];

	let x = checkForDuplicate(reference, data);
	return x.then((x) => {
		if (x === true) {
			res.json({ response: "game exists" });
		} else {
			const key = app.database().ref("Games/" + data.name);
			return key.set(gameModel, (error) => {
				if (error) {
					res.json(error);
				} else {
					res.json({
						players: gameModel.players,
						cards: gameModel.cards,
						name: data.name,
						code: "Game set succesfully",
					});
				}
			});
		}
	});
};
