import { useState } from "react";

export const FeedbackForm = () => {
	const [shown, setShown] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [type, setType] = useState("feedback");
	async function handleSend() {
		if (data === null || data === "" || data.lenght < 4) {
			setError(
				"Please fill the textbox properly. Data either empty or least than 4 characters"
			);
		} else {
			setError("dziękujemy za opinie, dużo to dla nas znaczy");
			await fetch("api/SendFeedback", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type: type,
					feedback: data,
				}),
			});
			setTimeout(() => {
				setShown(false);
			}, 1000);
		}
	}
	const radio = {
		width: "100%",
		display: "flex",
		justifyContent: "center",
	};
	const paragraph = {
		margin: "5% 0% 5% 0%",
		wordBreak: "keep-all",
		textAlign: "center",
	};
	const container = {
		display: "flex",
		flexDirection: "column",
	};
	return !shown ? (
		<>
			<button id="ShowFeedback" onClick={() => setShown(!shown)}>
				Podziel się opinią
			</button>
		</>
	) : (
		<div className="FeedbackForm">
			<p style={paragraph}>{error}</p>
			<p style={paragraph}>Podaj swoją opinię o produkcie</p>
			<div onChange={(e) => setType(e.target.value)}>
				<div style={radio}>
					<input type="radio" id="bug" name="answer" value="bug" />
					<label for="bug">Bug</label>
					<input type="radio" id="feedback" name="answer" value="feedback" />
					<label for="feedback" defaultChecked>
						Just Feedback
					</label>
				</div>
			</div>
			<div style={container}>
				<input
					id="GiveFeedbackInput"
					type="text"
					onChange={(e) => setData(e.target.value)}
				></input>
				<button id="GiveFeedbackButton" onClick={() => handleSend()}>
					Wyślij
				</button>
			</div>
		</div>
	);
};
