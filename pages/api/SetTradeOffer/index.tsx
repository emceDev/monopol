import next, { NextApiRequest, NextApiResponse } from "next";
export default (req: NextApiRequest, res: NextApiResponse) => {
	const data = JSON.parse(req.body);
	console.log(data);
	// set offer in db
	return res.json({ asd: "asd" });
};