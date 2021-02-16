import { useState } from "react";
import { useRecoilState } from "recoil";
import { mainPlayerData } from "../state/atom";
import { useRouter } from "next/router";
import { redirect } from "next/dist/next-server/server/api-utils";

export const CreatePlayer = () => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [color, setColor] = useState("white");
	const [error, setError] = useState(null);
	const [playerData, setPlayerData] = useRecoilState(mainPlayerData);

	const router = useRouter();

	async function register(data) {
		const res1 = await fetch("api/Register", {
			method: "POST",
			body: JSON.stringify({ data: data }),
		});

		const res2 = await res1.json();
		if (typeof res2.response === "object") {
			setPlayerData({
				loggedIn: true,
				name: res2.response.name,
				key: res2.response.key,
			});
			localStorage.setItem("player", JSON.stringify(res2.response));
			router.push("/");
		} else {
			setError(res2.response);
		}
	}
	function handleRegister() {
		let data = { name, password, color };
		register(data);
	}
	return (
		<div className="Register">
			{error}
			<label>Wypełnij aby się zarejestrować</label>
			<input
				placeholder="Login"
				onChange={(e) => {
					setName(e.target.value);
				}}
			></input>
			<input
				placeholder="Hasło"
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			></input>
			<input
				placeholder="Kolor po angielsku"
				onChange={(e) => {
					setColor(e.target.value);
				}}
			></input>
			<button
				onClick={() => {
					handleRegister();
				}}
			>
				Zarejestruj
			</button>
		</div>
	);
};
