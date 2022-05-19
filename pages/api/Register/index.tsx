import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";
import {sendUserDevice} from '../SendDevice/index'
async function getKey(reference) {
	return await app.database().ref(reference).push();
}

async function checkForDuplicate(ref, data) {
	return await app
		.database()
		.ref(ref)
		.once("value")
		.then((snap) => {
			let x = snap.val();
			let players = Object.values(x);
			return Array.isArray(players)
				? players.map((x: any) => {
						return x.name === data;
				  })
				: console.log("it is not an array");
		});
}
function handleMetrics(age,key,device) {
	sendUserDevice(key,device)
}
export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body).data;
	const reference = "Players/";
	console.log(data)
	let password = data.password;
	let upperCaseLetters = /[A-Z]/g;
	let numbers = /[0-9]/g;

	if (password.length<6) {
		res.json({response:'Podane hasło jest krótsze niż sześć znaków'})
	}else if(upperCaseLetters.test(password)===false){
		res.json({response:'Podane hasło nie zawiera Wielkiej litery'})
	}else if(numbers.test(password)===false){
		res.json({response:'Podane hasło nie zawiera cyfry'})}
		else{
			console.log(data);
	let userDevice = data.device
	delete data.device
	const registerDate = new Date().toString()
	let response = checkForDuplicate(reference, data.name);
	response.then((x: any) => {
		if (x.includes(true)) {
			res.json({ response: "Użytkownik o podanej nazwie już istnieje" });
		} else {
			getKey(reference).then((key: any) =>
				key
					.set({
						...data,
						registerDate,
						key: key.key,
					})
					.then(()=>res.json({ response: { key: key.key, name: data.name } })).then(()=>handleMetrics(data.age,key.key,userDevice))	);
		}})}
};
