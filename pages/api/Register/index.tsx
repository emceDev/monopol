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
	console.log('====BAckend User data ONE')
	console.log(data)
	// sets password for temporary user... Needs for fix
	data.password===null?data.password='Temporary1':null

	let password = data.password
	let upperCaseLetters = /[A-Z]/g;
	let numbers = /[0-9]/g;
	let userDevice = data.device
	
	console.log('====BAckend User data TWOs')
	console.log(data)

	if (password.length<6) {
		res.json({response:'Podane hasło jest krótsze niż sześć znaków'})
	}else if(upperCaseLetters.test(password)===false){
		res.json({response:'Podane hasło nie zawiera Wielkiej litery'})
	}else if(numbers.test(password)===false){
		res.json({response:'Podane hasło nie zawiera cyfry'})}
		else{
			// console.log(data);

	
	delete data.device
	const registerDate = new Date().toString()
	let response = checkForDuplicate(reference, data.name);
	response.then((x: any) => {
		if (x.includes(true)) {
			return res.json({ response: "Użytkownik o podanej nazwie już istnieje" });
		} else {
			return getKey(reference).then((key: any) =>
				key
					.set({
						...data,
						registerDate,
						key: key.key,
					})
					.then(()=>res.json({ response: { key: key.key, name: data.name,lastOnline:registerDate,color:data.color } })).then(()=>handleMetrics(data.age,key.key,userDevice))	);
		}})}
};
