import { app } from "./api/config/firebase";
import { useEffect } from "react";
export default function GetGame(props) {
	useEffect(() => {
		console.log(props);
	}, []);
	return <div>asd</div>;
}

export async function getServerSideProps(context) {
	const data = { game: "123" };
	const gameData = app.database().ref("Games/" + data.game + "/");
	console.log("Obserwing on:", data.game);
	let response = await gameData.on("child_changed", () => {
		gameData.off();
		return gameData.once("value").then((snapshot) => {
			console.log(snapshot.val());
			return snapshot.val();
		});
	});

	return {
		props: { response }, // will be passed to the page component as props
	};
}
