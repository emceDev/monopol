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
	const [age, setAge] = useState('');
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
				lastOnline:res2.response.date,
				name: res2.response.name,
				key: res2.response.key,
			});
			localStorage.setItem("player", JSON.stringify(res2.response));
			router.push("/");
		} else {
			setError(res2.response);
		}
	}
	function deviceType () {
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
	function handleRegister() {
		// let registerDate = new Date()
		let device = deviceType()
		let data = { name, password, color,age, device };
		if (data.name===''||data.password===''||data.color===''||data.age==='') {
			setError('Something is missing in the form')
		}else{
			register(data);
		}
		
	}
	return (
		<div className="Register">
			{error}
			<label>Wypełnij aby się zarejestrować</label>
			<input
				placeholder="Login"
				id="RegisterLogin"
				onChange={(e) => {
					setName(e.target.value);
				}}
			></input>
			<input
				placeholder="Hasło"
				id="RegisterPassword"
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			></input>
			<input
				placeholder="Kolor po angielsku"
				id="RegisterColor"
				onChange={(e) => {
					setColor(e.target.value);
				}}
			></input>
					<input
				placeholder="wiek"
				min="2"
				max="100"
				id="RegisterAge"
				type="number"
				onChange={(e) => {
					setAge(e.target.value);
				}}
			></input>
			<button
			id="RegisterSubmit"
				onClick={() => {
					handleRegister();
				}}
			>
				Zarejestruj
			</button>
		</div>
	);
};
