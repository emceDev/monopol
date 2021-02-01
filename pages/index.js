import { CreatePlayer } from "../microComponents/CreatePlayer";
import { Login } from "../microComponents/Login";
import styles from "../styles/Home.module.css";
import { SearchBar } from "../components/SearchBar";
import { PlayerCard } from "../components/PlayerCard";
import { GameData } from "../components/GameData";
import { useRecoilState } from "recoil";
import { mainPlayerData } from "../state/atom";
import Router, { useRouter } from "next/router";
import { Children, useEffect } from "react";

export default function RegLog() {
	const [mainPlayer, setMainPlayer] = useRecoilState(mainPlayerData);
	const router = useRouter();
	useEffect(() => {
		if (mainPlayer.loggedIn === false) {
			router.push("/");
		} else {
			router.push("/Home");
		}
	}, [mainPlayer.loggedIn]);
	// Json generator
	// function xd() {
	// 	console.log("edffe");
	// 	let x = {};
	// 	for (let i = 1; i < 41; i++) {
	// 		let key1 = "city" + [i];
	// 		x = {
	// 			...x,
	// 			[key1]: {
	// 				id: i,
	// 				owner: "bank",
	// 				price: "300",
	// 				name: "name" + [i],
	// 				country: "TUnazwa krajuf",
	// 				color: "rgba()",
	// 				tax: ["bezdokmu", "zdjednym", "z dwoma", "3domki", "4domki"],
	// 			},
	// 		};
	// 	}
	// 	console.log(x);
	// }	// city2: { id: 2, owner: "bank", price: "Cena", name: "nazwa",country:'TUnazwa krajuf',color:'rgba()',tax:['bezdokmu','zdjednym','z dwoma'] },	// "Przechodzisz na pole "Start" i pobierasz $200.'

	return (
		<div className={styles.container}>
			{/* <button onClick={() => xd()}>asd</button> */}

			<CreatePlayer />
			<Login />
		</div>
	);
}
