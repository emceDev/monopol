import { CreatePlayer } from "../microComponents/CreatePlayer";
import { Login } from "../microComponents/Login";
import styles from "../styles/Home.module.css";
import { SearchBar } from "../components/SearchBar";
import { GameData } from "../components/GameData";
import { useRecoilState } from "recoil";
import { mainPlayerData } from "../state/atom";
import Router, { useRouter } from "next/router";
import { Children, useEffect, useState } from "react";
export default function RegLog() {
	const [mainPlayer, setMainPlayer] = useRecoilState(mainPlayerData);
	const [player, setPlayer] = useState(null);
	const [choice, setChoice] = useState(false);
	const router = useRouter();
	useEffect(() => {
		// setPlayer(JSON.parse(localStorage.getItem("player")));
		// console.log(player);
	}, []);
	useEffect(() => {
		if (player !== null) {
			setMainPlayer(player);
			router.push("/Home");
		} else {
			console.log("asdasd");
		}
	}, [player]);

	return (
		<div className={styles.container}>
			{player === null ? (
				<>
					<div className="LoginPanel">
						<Login /> <CreatePlayer />
					</div>
				</>
			) : (
				<div>redirect</div>
			)}
		</div>
	);
}

{
	/* <button onClick={() => randCity()}>asd</button> */
}
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
