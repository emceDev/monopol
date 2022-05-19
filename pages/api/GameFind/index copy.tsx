import { NextApiRequest, NextApiResponse } from "next";
import { queueAtom } from "../../../state/atom";
import { app } from "../config/firebase";
import { setParticipated } from "../GameCreate";
import { addToQueue } from "../Queue";

async function checkForEntry(ref, data) {
	return await app
		.database()
		.ref(ref + data.game)
		.once("value")
		.then((snap) => {
			let game = snap.val();
			return game === null ? null : game;
		});
}
async function getGame(ref) {
	return await app
		.database()
		.ref(ref)
		.once("value")
		.then((snap) => {
			let game = snap.val();
			return game;
		});
}
async function setPlayers(data) {
	const ref = "Games/" + data.game;
	let err;
	return await app
		.database()
		.ref(ref + "/players/" + data.player + "/")
		.update(
			{
				name: data.player,
				key: data.key,
				color: data.color,
				currentField: data.currentField,
				balance: 3000,
			},
			(error) => {
				if (error) {
					return (err = error);
				} else {
					return (err = getGame(ref).then((x) => x));
				}
			}
		)
		.then(() => err);
}
async function setCardWhoIsOn(data, newArray) {
	return await app
		.database()
		.ref("Games/" + data.game + "/cards/city" + data.currentField + "/whoIsOn")
		.set(newArray);
}
async function checkCardWhoIsOn(game, data) {
	let whoIsInArray = game.cards["city" + data.currentField].whoIsOn;
	if (!whoIsInArray === true) {
		console.log("tabela jest null");
		return setCardWhoIsOn(data, [data.player]).then((x) => setPlayers(data));
	} else if (whoIsInArray == data.player) {
		console.log("sam w tablicy");
		return setCardWhoIsOn(data, whoIsInArray).then((x) => setPlayers(data));
	} else {
		console.log("dodajemy do tablicy");
		let newArray = [...whoIsInArray, data.player];
		return setCardWhoIsOn(data, newArray).then((x) => setPlayers(data));
	}
}
async function setFields(data) {
	const ref = "Games/" + data.game;
	return getGame(ref).then((game) => checkCardWhoIsOn(game, data));
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	const reference = "Games/";

	let isInDb = checkForEntry(reference, data);
	return isInDb.then((game) => {
		if (game === null) {
			res.status(404).json({ response: { code: "Nie znaleziono gry", game: null } });
		} else if (game.players[data.player] === undefined) {
			return setFields(data).then(async (game) => {
				addToQueue(game.players[data.player].name, game.name);
				await setParticipated(data.key, game.name)
				return res.json({
					response: { code: "Pomyślnie dołączono", game: game },
				});
			});
		} else if (game.players[data.player] !== undefined) {
			// return setFields(data).then(
			// (game) => console.log(game)
			// duplicates will be ommited when calling from gamefind
			res.json({ response: { code: "Ponowne dołączanie do gry", game: game } });
			// );
		}
	});
};
