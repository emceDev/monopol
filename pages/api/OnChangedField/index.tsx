import { app } from "../config/firebase";
import { changeBalance } from "../MoneyTransfer";
import { chanceHandler } from "../ChanceHandle/";
import { placeInJail } from "../Queue";
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
			return {
				newsFeed: playerName + " jest właścicielem pola " + card.name,
				code: "Jesteś właścicielem",
				data: card,
			};
		} else if (card.owner === "bank") {
			console.log("Bank Jest właścicielem");
			if (card.price !== 0 && card.owner === "bank") {
				return {
					newsFeed:
						"bank sklada ofertę kupna pola " +
						card.name +
						" graczowi " +
						playerName +
						" za " +
						card.price,
					code: "chcesz kupić to pole?",
					data: card,
				};
			} else if (card.tax.length === 1) {
				return changeBalance(
					gameName,
					playerName,
					card.owner,
					card.tax[0]
				).then((x) => {
					return {
						newsFeed:
							"gracz " +
							playerName +
							" stanął na polu " +
							card.name +
							" i zapłacił podatek wielkośći " +
							card.tax[0],
						code: playerName + " paid to " + card.owner,
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
						newsFeed:
							"gracz " +
							playerName +
							" stanął na polu " +
							card.name +
							" i zapłacił graczowi " +
							amount,
						code: code,
						data: card,
					};
				}
			);
		}
	} else {
		console.log("card.country other");
		if (card.id === 1) {
			return {
				newsFeed: playerName + " Wylądował na starcie.",
				code: "Jesteś na starcie :)",
				data: card,
			};
		} else if (card.id === 11) {
			return {
				newsFeed: "Gracz " + playerName + " przechodzi obok baru",
				code: "Przechodzisz obok baru",
				data: card,
			};
		} else if (card.id === 21) {
			return {
				newsFeed: "Gracz " + playerName + " odpoczywa na parkingu",
				code: "Odpoczywasz na parkingu",
				data: card,
			};
		} else if (card.id === 31) {
			// placeInJail(gameName, playerName);
			// return {
			// 	newsFeed:
			// 		"Gracz " + playerName + " spędza trzy kolejki ze znajomymi w barze",
			// 	code: "Idziesz Do Baru",
			// 	data: card,
			// };
			return {
				newsFeed:
					"Gracz " + playerName + " Ma farta że ta funkcja jest pobugowana, więc została wyłączona. W innym wypadku spędził by trzy kolejki w barze :(",
				code: "Przechodzisz obok baru",
				data: card,
			};
		} else if (card.tax !== undefined) {
			return changeBalance(gameName, playerName, card.owner, card.tax[0]).then(
				() => {
					return {
						newsFeed:
							"Gracz " +
							playerName +
							" stanął na polu " +
							card.name +
							"i zaplacił " +
							card.tax[0],
						code: card.name + card.tax[0],
						data: card,
					};
				}
			);
		} else if (card.name === "Chance" || "Community Chest") {
			let chance = await chanceHandler(data);
			console.log(chance);
			return {
				newsFeed:
					"Gracz " +
					playerName +
					" stanął na polu " +
					card.name +
					". " +
					chance,
				code: chance,
				data: card,
			};
		} else
			return {
				newsFeed: "Programista nie przewidział takiej rzeczy :P To ja ",
				code: "some wronge",
				data: card,
			};
	}
}
