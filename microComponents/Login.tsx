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
		// console.log(res2.response);
		if (res2.response !== undefined) {
			setPlayerData({
				...playerData,
				loggedIn: true,
				name: res2.response.name,
			});
			router.push("/");
		}
	}
	function handleLogin() {
		let data = { name, password };
		login(data);
	}

	return (
		<div>
			{playerData.name}
			{error}
			<input
				placeholder="Give name to login"
				onChange={(e) => {
					setName(e.target.value);
				}}
			></input>
			<input
				placeholder="password"
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			></input>
			<button
				onClick={() => {
					handleLogin();
				}}
			>
				Login
			</button>
		</div>
	);
};
