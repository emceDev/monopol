import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";



async function getQuestions() {
	return await app
		.database()
		.ref("Metrics/Questions")
		.once("value")
		.then((snap) => {
			// console.log(snap.val())
			return snap.val()
			// return snap.val();
		});
}

function compareQuestions(questions) {
	// console.log(questions.length)
	return questions[Math.floor(Math.random() * questions.length)]
// later mechanism for checking if question wa already answered by the player should be implemented
// And checking if question is still viable
}
async function setAnswer(question,answer) {
	// console.log(question)
	// console.log(answer)
	let questions = await getQuestions()
	let id = questions.findIndex(x=>x.Question===question.Question)
	console.log(id)
	let numberOfAnswers= await app
		.database()
		.ref("Metrics/Questions/"+[id]+'/GivenAnswers/'+[answer])
		.once("value")
		.then((snap) => {
			console.log(snap.val())
			return snap.val()
			// return snap.val();
		});
	// ref.child("pjoCy...0tl3/progress/0/6/0").set(1)
	let updates={}
	updates['Metrics/Questions/'+[id]+'/GivenAnswers/'+[answer]]=numberOfAnswers+1
	return await app
		.database()
		.ref()
		.update(updates, (error) => {
			if (error) {
				return error;
			} else {
				return null;
			}
		})
		.then((x) => console.log(x));
	
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method==='POST'){
		// await setAnswer(req.body.question,req.body.answer)
		// console.log('post')
		const data = req.body
		// console.log(data)
		setAnswer(data.question, data.answer)
		res.json(data)
	}if (req.method==='GET'){
	const question = await getQuestions().then(x=>compareQuestions(x))
	// console.log(question)
	return res.json(question)
	}


};
