import { app } from "../../../config/firebase";
import { changeBalance } from "../MoneyTransfer";
import { chanceHandler } from "../ChanceHandle/";
// import { movePlayer } from "../PlayerMove/index";
// NIE => LICYTACJA

// JEDNA ZMIENNA W BAZIE
// KAZDY GRACZ MODYFIKUJE JĄ

// Wychodzisz z więzienia. Kartę możesz zachować i wykorzystać w odpowiednim momencie, możesz ją wymienić lub sprzedać?

export async function onChangedField(data, cardD) {
	let playerName = data.playerName;
	let card = cardD;
	let gameName = data.gameName;
	const newData = (x: number) => {
		let playerName = data.playerName;
		let gameName = data.gameName;
		let previousField = data.previousField;
		let nextField = x;
	};

	if ((card.country === "other") === false) {
		if (card.owner === playerName) {
			console.log("player owns");
			return { code: "Jesteś właścicielem", data: card };
		} else if (card.owner === "bank") {
			console.log("Bank Jest właścicielem");
			if (card.price !== 0) {
				return { code: "chcesz kupić to pole?", data: card };
			} else if (card.tax.length > 1) {
				const gameRef = "Games/" + gameName + "/players/";
				return changeBalance(gameRef, playerName, card.owner, card.tax[0]).then(
					(x) => {
						return {
							code: "paid to" + card.owner,
							data: card,
						};
					}
				);
			}
		} else {
			let amount = card.tax[card.tax.homes];
			console.log(amount);
			console.log("pay other player");
			return changeBalance(gameName, playerName, card.owner, amount).then(
				(x) => {
					return {
						code: "paid other player",
						data: { amount: amount, receiver: card.owner },
					};
				}
			);
		}
	} else {
		console.log("card.country other");
		if (card.id === 1) {
			return {
				code: "Jesteś na starcie :)",
				data: card,
			};
		} else if (card.id === 11) {
			return {
				code: "Odwiedzasz więzienie",
				data: card,
			};
		} else if (card.id === 21) {
			return {
				code: "Jesteś na parkingu",
				data: card,
			};
		} else if (card.id === 31) {
			return {
				code: "Idziesz Do Baru",
				data: card,
			};
		} else if (card.tax !== undefined) {
			const gameRef = "Games/" + gameName + "/players/";
			// gameRef, giverRef, receiverRef, amount
			return changeBalance(gameRef, playerName, card.owner, card.tax[0]).then(
				() => {
					return {
						code: card.name + card.tax[0],
						data: card,
					};
				}
			);
		} else if (card.name === "Chance") {
			let chance = chanceHandler(data);
			return {
				code: chance,
				data: card,
			};
		} else null;
	}
}
