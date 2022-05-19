import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import { mainPlayerData } from "../state/atom";
import { useRouter } from "next/router";

// check if user in db

export const Login = () => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [playerData, setPlayerData] = useRecoilState(mainPlayerData);

	const router = useRouter();

	async function login(data) {
		const res1 = await fetch("api/LogIn", {
			method: "POST",
			body: JSON.stringify({ data: data }),
		});
		const res2 = await res1.json();
		let p=res2.response
		if (res2.response !== undefined) {
	
			setPlayerData({
				...playerData,
				...p,
				loggedIn: true,
				name: res2.response.name,
			});
			localStorage.setItem("player", JSON.stringify(res2.response));
			router.push("/Home");
		}else{
			
			setError('Błędny login lub hasło')
		}
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
	};
	function handleLogin() {
		let device = deviceType()
		// console.log(device)
		let data = { name, password, device };
		login(data);
	}

	return (
		<div className="Login">
			<label>Wypełnij aby się zalogować</label>
			<div style={{color:"white"}}>{error}</div>
			<input
				placeholder="Login"
				id="LoginLogin"
				onChange={(e) => {
					setName(e.target.value);
				}}
			></input>
			<input
				placeholder="Hasło"
				id="LoginPassword"
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			></input>
			<button
				id="LoginSubmit"
				onClick={() => {
					handleLogin();
				}}
			>
				Zaloguj
			</button>
		</div>
	);
};
