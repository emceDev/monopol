import { useState } from "react";
import { useRecoilState } from "recoil";
import { mainPlayerData } from "../state/atom";
import { useRouter } from "next/router";

export const CreatePlayer = () => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [color, setColor] = useState("white");
	const [error, setError] = useState(
		"Hasło powninno składać się z sześciu znaków w tym z jednej wielkiej litery oraz cyfry"
	);
	const [age, setAge] = useState(99);
	const [playerData, setPlayerData] = useRecoilState(mainPlayerData);

	const router = useRouter();

	async function register(data) {
		const res1 = await fetch("api/Register", {
			method: "POST",
			body: JSON.stringify({ data: data }),
		});

		const res2 = await res1.json();
		// console.log(res2);
		if (typeof res2.response === "object") {
			console.log("createPlayerResponse");
			console.log(res2.response);
			setPlayerData({
				loggedIn: true,
				lastOnline: res2.response.date,
				name: res2.response.name,
				key: res2.response.key,
				color: res2.response.color,
			});
			setError("Pomyślnie zarejestrowano");
			localStorage.setItem("player", JSON.stringify(res2.response));
			router.push("/Home");
		} else {
			setError(res2.response);
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
	}
	function handleRegister() {
		// let registerDate = new Date()
		let device = deviceType();
		let data = { name, password, color, age, device };
		if (
			data.name === "" ||
			data.password === "" ||
			data.color === "" ||
			data.age === ""
		) {
			setError("Czegoś brakuje w formularzu");
		} else {
			register(data);
		}
	}
	return (
		<div className="Register">
			<label>Wypełnij aby się zarejestrować</label>
			<div
				style={{
					color: "white",
					height: "10vh",
					width: "85%",
					wordBreak: "break-word",
					textAlign: "center",
				}}
			>
				{error}
			</div>
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
			<ColorPicker setColor={setColor} />
			{/* <input
				placeholder=""
				id="RegisterColor"
				onChange={(e) => {
					setColor(e.target.value);
				}}
			></input> */}
			<input
				placeholder="Możesz podać swój wiek"
				min="2"
				max="100"
				id="RegisterAge"
				type="number"
				style={{ width: "50%" }}
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
const ColorPicker = (props) => {
	const styl = {
		alignItems: "center",
		width: "100%",
		display: "flex",
		flexDirection: "column",
	};
	const colors = [
		"orange",
		"pink",
		"blue",
		"green",
		"yellow",
		"gray",
		"black",
		"lightblue",
		"red",
	];
	return (
		<div style={styl}>
			<p style={{ color: "white" }}>Wybierz kolor swojego pionka w grze</p>

			<div
				style={{
					paddingLeft: "5%",
					paddingBottom: "1%",
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-evenly",
					width: "100%",
					height: "10vh",
				}}
			>
				{colors.map((color) => {
					return (
						<div
							id={`colorPicker${color}`}
							style={{
								width: "10%",
								minHeight: "100%",
								backgroundColor: color,
							}}
							onClick={(e) => props.setColor(e.target.style.backgroundColor)}
						></div>
					);
				})}
			</div>
		</div>
	);
};
