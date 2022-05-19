import { useEffect, useState } from "react";
export const NewsFeedQuestion = () => {
	const [shown, setShown] = useState(true);
	const [question, setQuestion] = useState(undefined);
	function changed(e) {
		let value = e.target.value;
		let index = question.PossibleAnswer.indexOf(value);
		setAnswer(index);
		// console.log(index);
		// console.log();
		setShown(false);
	}
	async function getQuestionOfTheDay() {
		const res1 = await fetch("api/QuestionOfTheDay", {
			method: "GET",
		});
		const res2 = await res1.json();
		setQuestion(res2);
	}
	async function setAnswer(answer) {
		const res1 = await fetch("api/QuestionOfTheDay", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				question: question,
				answer: answer,
			}),
		});
		const res2 = await res1.json();
		// console.log(res2);
	}
	useEffect(() => {
		getQuestionOfTheDay();
	}, []);
	return (
		<div className="NewQuestion" style={{ display: shown ? "block" : "none" }}>
			<button onClick={() => getQuestionOfTheDay()}>getQuestion</button>
			Question of The day:
			{question !== undefined ? (
				<div id="NewsFeedQuestion">
					{/* {console.log(question)} */}
					<p>{question.Question}</p>
					<div onChange={(e) => changed(e)}>
						{question.PossibleAnswer.map((x) => {
							return (
								<>
									<input type="radio" id={x} name="answer" value={x} />
									<label for={x}>{x}</label>
								</>
							);
						})}
					</div>
				</div>
			) : null}
		</div>
	);
};
