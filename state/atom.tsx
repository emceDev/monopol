import { atom, selector } from "recoil";

export const newsFeedAtom = atom({
	key: "newsFeedData",
	default: null,
});
export const highLight = atom({
	key: "highLight",
	default: {
		card: "none",
	},
});
export const focusedCardData = atom({
	key: "focusedCardData",
	default: null,
});
export const tradeAtom = atom({
	key: "tradeAtom",
	default: {
		isOpen: false,
	},
});

export const mainPlayerData = atom({
	key: "mainPlayerData",
	default: {
		loggedIn: false,
		lastOnline:null,
		key: null,
		name: null,
	},
});

export const playersAtom = atom({
	key: "players",
	default: {
		id1: {
			key: "key",
			balance: "3000",
			currentField: 1,
		},
	},
});
export const gameNameAtom = atom({
	key: "gameNameAtom",
	default: null,
});

export const cardsAtom = atom({
	key: "cards",
	default: {
		city1: {
			id: 1,
			owner: "bank",
			price: 0,
			name: "Start",
			country: "other",
			tax: null,
		},
		city2: {
			id: 2,
			owner: "bank",
			price: 60,
			name: "Odessa",
			country: "Ukraina",
			color: "#E3B23C",
			tax: [2, 10, 30, 90, 150],
			homes: 0,
			homeCost: 50,
		},
		city3: {
			id: 3,
			owner: "bank",
			price: 0,
			name: "Community Chest",
			country: "other",
			tax: null,
		},
		city4: {
			id: 4,
			owner: "bank",
			price: 60,
			name: "Kijów",
			country: "Ukraina",
			color: "#E3B23C",
			tax: [4, 20, 60, 180, 320],
			homes: 0,
			homeCost: 50,
		},
		city5: {
			id: 5,
			owner: "bank",
			price: 0,
			name: "IncomeTax",
			country: "other",
			tax: [200],
			homes: 0,
			homeCost: 50,
		},
		city6: {
			id: 6,
			owner: "bank",
			price: 200,
			name: "Koleje Południowe",
			country: "koleje",
			color: "#F4E3B2",
			homes: 0,
			tax: null,
		},
		city7: {
			id: 7,
			owner: "bank",
			price: 100,
			name: "Quba",
			country: "Azerbejdżan",
			color: "#75B8C8",
			tax: [6, 30, 80, 270, 400],
			homes: 0,
			homeCost: 50,
		},
		city8: {
			id: 8,
			owner: "bank",
			price: 0,
			name: "Chance",
			country: "other",
			tax: null,
		},
		city9: {
			id: 9,
			owner: "bank",
			price: 100,
			name: "Xudat",
			country: "Azerbejdżan",
			color: "#75B8C8",
			tax: [6, 30, 80, 270, 400],
			homes: 0,
			homeCost: 50,
		},
		city10: {
			id: 10,
			owner: "bank",
			price: 120,
			name: "Naftalan",
			country: "Azerbejdżan",
			color: "#75B8C8",
			tax: [6, 40, 100, 0, 450],
			homes: 0,
			homeCost: 50,
		},
		city11: {
			id: 11,
			owner: "bank",
			price: 0,
			name: "OdwiedzaszWięzienie",
			country: "other",
			tax: undefined,
		},
		city12: {
			id: 12,
			owner: "bank",
			price: 140,
			name: "Bathsheba",
			country: "Barbados",
			color: "#FF715B",
			tax: [10, 50, 150, 450, 625],
			homes: 0,
			homeCost: 100,
		},
		city13: {
			id: 13,
			owner: "bank",
			price: 0,
			name: "ElectricCompany",
			country: "other",
			tax: [200],
			homes: 0,
			homeCost: 50,
		},
		city14: {
			id: 14,
			owner: "bank",
			price: 140,
			name: "Blackman's",
			country: "Barbados",
			color: "#FF715B",
			tax: [10, 50, 150, 450, 625],
			homes: 0,
			homeCost: 100,
		},
		city15: {
			id: 15,
			owner: "bank",
			price: 160,
			name: "Bulkeley",
			country: "Barbados",
			color: "#FF715B",
			tax: [12, 60, 180, 600, 700],
			homes: 0,
			homeCost: 100,
		},
		city16: {
			id: 16,
			owner: "bank",
			price: 200,
			name: "Koleje Zachodnie",
			country: "koleje",
			color: "#F4E3B2",
			homes: 0,
			tax: [12],
		},
		city17: {
			id: 17,
			owner: "bank",
			price: 180,
			name: "Warmątowice",
			country: "Polska",
			color: "#912F56",
			tax: [14, 70, 200, 550, 700],
			homes: 0,
			homeCost: 100,
		},
		city18: {
			id: 18,
			owner: "bank",
			price: 0,
			name: "Community Chest",
			country: "other",
			tax: null,
		},
		city19: {
			id: 19,
			owner: "bank",
			price: 180,
			name: "Wieśniany",
			country: "Polska",
			color: "#912F56",
			tax: [14, 70, 200, 550, 700],
			homes: 0,
			homeCost: 100,
		},
		city20: {
			id: 20,
			owner: "bank",
			price: 200,
			name: "Wenecja",
			country: "Polska",
			color: "#912F56",
			tax: [16, 80, 220, 600, 800],
			homes: 0,
			homeCost: 100,
		},
		city21: {
			id: 21,
			owner: "bank",
			price: 0,
			name: "Parking",
			country: "other",
			tax: undefined,
		},
		city22: {
			id: 22,
			owner: "bank",
			price: 220,
			name: "Szardża",
			country: "Emiraty",
			color: "#B4DC7F",
			tax: [18, 90, 250, 700, 875],
			homes: 0,
			homeCost: 150,
		},
		city23: {
			id: 23,
			owner: "bank",
			price: 0,
			name: "Chance",
			country: "other",
			tax: null,
		},
		city24: {
			id: 24,
			owner: "bank",
			price: 220,
			name: "Adżman",
			country: "Emiraty",
			color: "#B4DC7F",
			tax: [18, 90, 250, 700, 875],
			homes: 0,
			homeCost: 150,
		},
		city25: {
			id: 25,
			owner: "bank",
			price: 240,
			name: "Al-Chajma",
			country: "Emiraty",
			color: "#B4DC7F",
			tax: [20, 100, 300, 750, 925],
			homes: 0,
			homeCost: 150,
		},
		city26: {
			id: 26,
			owner: "bank",
			price: 200,
			name: "Koleje Północne",
			country: "koleje",
			color: "#F4E3B2",
			homes: 0,
			tax: null,
		},
		city27: {
			id: 27,
			owner: "bank",
			price: 260,
			name: "Portoviejo",
			country: "Ekwador",
			color: "#F4E87C",
			tax: [22, 110, 330, 800, 975],
			homes: 0,
			homeCost: 150,
		},
		city28: {
			id: 28,
			owner: "bank",
			price: 260,
			name: "Guayaquil",
			country: "Ekwador",
			color: "#F4E87C",
			tax: [22, 110, 330, 800, 975],
			homes: 0,
			homeCost: 150,
		},
		city29: {
			id: 29,
			owner: "bank",
			price: 0,
			name: "GasWorks",
			country: "other",
			tax: [200],
			homes: 0,
		},
		city30: {
			id: 30,
			owner: "bank",
			price: 280,
			name: "Quito",
			country: "Ekwador",
			color: "#F4E87C",
			tax: [24, 120, 350, 850, 1025],
			homes: 0,
			homeCost: 150,
		},
		city31: {
			id: 31,
			owner: "bank",
			price: 0,
			name: "Jail",
			country: "other",
			tax: undefined,
		},
		city32: {
			id: 32,
			owner: "bank",
			price: 300,
			name: "Moratuwa",
			country: "Sri Lanka",
			color: "#B07156",
			tax: [26, 130, 390, 900, 1100],
			homes: 0,
			homeCost: 200,
		},
		city33: {
			id: 33,
			owner: "bank",
			price: 300,
			name: "Kotte",
			country: "Sri Lanka",
			color: "#B07156",
			tax: [26, 130, 390, 900, 1100],
			homes: 0,
			homeCost: 200,
		},
		city34: {
			id: 34,
			owner: "bank",
			price: 0,
			name: "Community Chest",
			country: "other",
			tax: null,
		},
		city35: {
			id: 35,
			owner: "bank",
			price: 320,
			name: "Kalmunai",
			country: "Sri Lanka",
			color: "#B07156",
			tax: [28, 150, 450, 1000, 1200],
			homes: 0,
			homeCost: 200,
		},
		city36: {
			id: 36,
			owner: "bank",
			price: 200,
			name: "Koleje Wschodnie",
			country: "koleje",
			color: "#F4E3B2",
			homes: 0,
			tax: null,
		},
		city37: {
			id: 37,
			owner: "bank",
			price: 0,
			name: "Chance",
			country: "other",
			tax: null,
		},
		city38: {
			id: 38,
			owner: "bank",
			price: 200,
			name: "Harare",
			country: "Zimbabwe",
			color: "#14591D",
			tax: [35, 175, 500, 1100, 1300],
			homes: 0,
			homeCost: 50,
		},
		city39: {
			id: 39,
			owner: "bank",
			price: 0,
			name: "LuxuyTax",
			country: "other",
			tax: [200],
			homes: 0,
			homeCost: 50,
		},
		city40: {
			id: 40,
			owner: "bank",
			price: 400,
			name: "Kwekwe",
			country: "Zimbabwe",
			color: "#14591D",
			tax: [50, 200, 600, 1400, 1700],
			homes: 0,
			homeCost: 200,
		},
	},
});
export const queueAtom = atom({
	key: "queue",
	default: {
		players: null,
		current: 0,
		jail: null,
		tick: 0,
	},
});
export const hintAtom = atom({
	key: "hintAtom",
	default:
		"tutaj zobaczysz powiadomienia z gry, możesz wyłączyć tę funkcję za 99.9$",
});
export const mainGameData = selector({
	key: "mainGameData",
	get: ({ get }) => {
		const players = get(playersAtom);
		const cards = get(cardsAtom);
		const name = get(gameNameAtom);
		const newsFeed = get(newsFeedAtom);
		const trade = get(tradeAtom);
		const queue = get(queueAtom);
		const hint = get(hintAtom);
		const mainGameData = { name, players, cards, newsFeed, trade, queue, hint };
		return {
			...mainGameData,
		};
	},
});
