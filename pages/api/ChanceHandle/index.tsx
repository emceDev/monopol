import { movePlayer } from "../PlayerMove/index";
import { changeBalance } from "../MoneyTransfer/index";
const cities = [
	[2, "Odessa"],
	[4, "Kijów"],
	[9, "Xudat"],
	[15, "Bulkeley"],
];
const randCity = () => {
	let min = Math.ceil(0);
	let max = Math.floor(cities.length);
	let randNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	return cities[randNumber];
};
const closestCity = (data) => {
	let currField = data.nextField;
	let ids = [];
	cities.map((x) => ids.push(x[0]));
	return ids.reduce(function (prev, curr) {
		return Math.abs(curr - currField) < Math.abs(prev - currField)
			? curr
			: prev;
	});
};
async function moveTo(data, chance) {
	console.log("move");
	console.log(data);
	let idStart = chance.indexOf("pole: ") + 6;
	let id = Number(chance.slice(idStart, idStart + 2));
	const newData = {
		playerName: data.playerName,
		gameName: data.gameName,
		previousField: data.nextField,
		nextField: id,
	};
	return await movePlayer(newData);
}
const chances = (data) => [
	"Przechodzisz na pole: " +
		randCity()[0] +
		'. Jeśli przechodzisz przez "Start", pobierasz $200.',
	"Przechodzisz do najbliższego miasta. Jeśli nie ma właściciela, możesz je kupić od Banku. Jeśli posiada właściciela, rzucasz kostką i płacisz mu dziesięciokrotność wyrzuconej liczby oczek.Przechodzisz na pole: " +
		closestCity(data),
	"Spotkałeś/aś dawnych znajomych, idziesz do baru na trzy kolejki. Przechodzisz na pole: 31.Bar",
	"Odwiedzasz miasto Kwekwe, ekhem. Przechodzisz na pole: 40.kwekwe",
	'Wybierasz się na wycieczkę do Kolei Południowych. Przechodzisz na pole: 6.Koleje Południowe. Jeśli przechodzisz przez "Start", pobierasz $200.',
	"Odwiedzasz kolegę w Quito. Przechodzisz na pole: 30.Quito",
	// "Cofnij się o trzy pola.",
	// "Cofasz się o 6 pól",

	"Bank płaci Ci dywidendę w wysokości $50. Pobierasz: $50 ",
	"Zysk z budynków i pożyczek wzrósł. Pobierasz: $150.",
	"Los się do Ciebie uśmiechął. A ściślej kupon Dużego Lotka. Wygrałeś $200. Pobierasz: $200.",
	'Wysłałeś rozwiązaną krzyżówkę do redakcji "Tele Tygodnia" i wygrałeś $100. Pobierasz: $100',
	"Wsiadasz do taksówki. Dopijasz kawę w trakcie jazdy. Dzielisz się z tapicerką. Za szkody płacisz taksówkarzowi $70. Płacisz $70",
	"Hałasujesz na plaży, uprzykrzając innym opalanie. Płacisz $30.",
	"Poprzedniej nocy wypowiadałeś się nieprzychylnie o rządzących. Kolega to nagrał. Płacisz mu $200. Płacisz $200.",

	// "Powierzono Ci funkcję prezesa Zarządu. Płacisz każdemu graczowi $50.",
	// "Robisz remont generalny wszystkich swoich własności: za remont każdego domku płacisz $40.",
];

function randomCardDraw(data) {
	let min = Math.ceil(0);
	let max = Math.floor(chances.length - 1);
	let randNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	return chances(data)[randNumber];
}
async function payTo(data, chance) {
	console.log("payin");
	let idStart = chance.indexOf("$") + 1;
	let amount = Number(chance.slice(idStart, idStart + 3));
	if ((chance.indexOf("Pobierasz: ") !== -1) === true) {
		return await changeBalance(data.gameName, "bank", data.playerName, amount);
	} else {
		return await changeBalance(data.gameName, data.playerName, "bank", amount);
	}
}
async function filterChance(data, chance) {
	if (chance.indexOf("pole: ") !== -1) {
		moveTo(data, chance);
		return chance;
	}
	if (
		chance.indexOf("Pobierasz: ") !== -1 ||
		chance.indexOf("Płacisz: ") !== -1
	) {
		payTo(data, chance);
		return chance;
	}
	return chance;
}
export const chanceHandler = (data) => {
	console.log(data);
	return filterChance(data, randomCardDraw(data)).then((x) => x);
};
