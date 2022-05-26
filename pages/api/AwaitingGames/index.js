import { app } from "../config/firebase";
export async function addToAwaitingGames(name, date, owner) {
	getAwaitingGames()
		.then((list) => [...list, { date: date, name: name, owner: owner }])
		.then((x) => {
			console.log("======");
			console.log(x);
			app.database().ref("Games/AwaitGames/").set(x);
		});
}

export async function getAwaitingGames() {
	return await app
		.database()
		.ref("Games/AwaitGames")
		.once("value")
		.then((snap) => {
			// console.log(snap.val());
			return snap.val();
		});
}

async function sortGames() {
	let newGames = [];
	// num of mins -10min
	let mins = 110;
	let date = new Date();
	let da = date.setMinutes(date.getMinutes() - 15);

	let gameList = await getAwaitingGames();
	gameList.map((game) => {
		let Gdate = new Date(game.date);
		console.log(date);
		console.log(Gdate);
		Gdate > date ? newGames.push(game) : null;
	});
	// await updateAwaitList(newGames);
	return newGames;
}
async function updateAwaitList(list) {
	app.database().ref("Games/AwaitGames/").set(list);
}
// execute when game starts
// implement game starting mechanics
export async function removeFromList(name) {
	let gameList = getAwaitingGames();
	let newGames = [];
	gameList.map((game) => (game.name === name ? null : newGames.push(game)));
	updateAwaitList(newGames);
}
export default (req, res) => {
	sortGames().then((x) => (x !== null ? res.json(x) : res.status(404)));
};
