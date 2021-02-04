import { app } from "../config/firebase";
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
	if ((card.country === "other") === false) {
		if (card.owner === playerName) {
			console.log("player owns");
			return { code: "Jesteś właścicielem", data: card };
		} else if (card.owner === "bank") {
			console.log("Bank Jest właścicielem");
			if (card.price !== 0 && card.owner === "bank") {
				return { code: "chcesz kupić to pole?", data: card };
			} else if (card.tax.length > 1) {
				return changeBalance(
					gameName,
					playerName,
					card.owner,
					card.tax[0]
				).then((x) => {
					return {
						code: "paid to" + card.owner,
						data: card,
					};
				});
			}
		} else {
			let amount = card.tax[card.homes];
			console.log(amount);
			let code = "Zapłaciłeś/aś graczowi: " + card.owner + " " + amount;
			return changeBalance(gameName, playerName, card.owner, amount).then(
				(x) => {
					return {
						code: code,
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
			return changeBalance(gameName, playerName, card.owner, card.tax[0]).then(
				() => {
					return {
						code: card.name + card.tax[0],
						data: card,
					};
				}
			);
		} else if (card.name === "Chance" || "CommunityChest") {
			let chance = await chanceHandler(data);
			console.log(chance);
			return {
				code: chance,
				data: card,
			};
		} else
			return {
				code: "some wronge",
				data: card,
			};
	}
}
// changeBalance(gameName,'bank',playerName,200)
