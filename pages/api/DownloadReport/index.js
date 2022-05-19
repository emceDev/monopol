import { app } from "../config/firebase";
async function sendReport() {
	let updates = {};
	let number = await app
		.database()
		.ref("Metrics/Feedback/Downloads/")
		.once("value")
		.then((snap) => {
			snap.val() === null ? 0 : snap.val();
			return snap.val();
		});
	updates["Metrics/Feedback/Downloads"] = number + 1;
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
	// console.log("====here====");
	// console.log(numberOfDevices);
	// console.log("====END====");
}

export default async (req, res) => {
	if (req.method === "POST") {
		const data = req.body;
		sendReport();
		return res.json("");
	}
};
