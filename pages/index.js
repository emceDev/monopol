import styles from "../styles/Home.module.css";
import { useRecoilState } from "recoil";
import { mainPlayerData } from "../state/atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RegLog() {
	const [mainPlayer, setMainPlayer] = useRecoilState(mainPlayerData);
	const [player, setPlayer] = useState(null);
	const [playerData, setPlayerData] = useRecoilState(mainPlayerData);
	const router = useRouter();

	useEffect(() => {
		console.log("===got player");
		// setPlayer(JSON.parse(localStorage.getItem("player")));
		console.log(JSON.parse(localStorage.getItem("player")));
		console.log();
		redirect(JSON.parse(localStorage.getItem("player")));
	}, []);
	async function register(data) {
		const res1 = await fetch("api/Register", {
			method: "POST",
			body: JSON.stringify({ data: data }),
		});

		const res2 = await res1.json();
		// console.log(res2);
		if (typeof res2.response === "object") {
			setPlayerData({
				loggedIn: true,
				lastOnline: res2.response.date,
				name: res2.response.name,
				key: res2.response.key,
				color: res2.response.color,
			});
			console.log("Pomyślnie zarejestrowano");
			localStorage.setItem("player", JSON.stringify(res2.response));
			router.push("/Home");
		} else {
			console.log(res2.response);
		}
	}
	function generateUniqueString() {
		var ts = String(new Date().getTime()),
			i = 0,
			out = "";

		for (i = 0; i < ts.length; i += 2) {
			out += Number(ts.substr(i, 2)).toString(36);
		}

		return "prefix" + out;
	}
	function deviceType() {
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			return "tablet";
		}
		if (
			/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
				ua
			)
		) {
			return "mobile";
		}
		return "desktop";
	}
	function redirect(player) {
		console.log("Player effect");
		console.log(player);
		if (player !== null) {
			setMainPlayer(player);
			router.push("/Home");
		} else {
			console.log("TEMP REGISTER");
			let name = generateUniqueString();
			let data = {
				name: name,
				password: null,
				color: "yellow",
				age: 99,
				device: deviceType(),
				temp: true,
			};
			console.log("regsiterdate");
			console.log(data);
			register(data);
		}
	}

	return (
		<div className={styles.container}>
			{player === null ? (
				<>
					<div className="LoginPanel">
						<p>Automatyczne przekierowanie</p>
						{/* <Login /> <CreatePlayer /> */}
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
