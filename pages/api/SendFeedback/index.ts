import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../config/firebase";

async function setFeedback(type:String,data:String) {

	let date=new Date
    let updates={}

	updates['Metrics/Feedback/'+type+'/'+date]={text:data}
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
		const data = req.body
		if(data.type==='bug'){
			setFeedback('bug',data.feedback)
		}else if(data.type==='feedback'){
			setFeedback('feedback',data.feedback)
		}
		res.json(data)
	}


};