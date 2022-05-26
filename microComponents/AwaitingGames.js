import { useState } from "react";

export const AwaitingGames = (props) => {
	const [awaitingGames, setAwaitingGames] = useState(null);
	async function getGames() {
		console.log("getting games");
		const res1 = await fetch("api/AwaitingGames", {
			method: "GET",
		});
		if (res1.status === 200) {
			const res2 = await res1.json();
			setAwaitingGames(res2);
		} else {
			console.log("otherstatus");
		}
	}
	return (
		<div>
			<button onClick={() => getGames()}>Sprawdź dostępne gry</button>
			<>
				{awaitingGames !== null ? (
					<div>
						{awaitingGames.map((game) => {
							return (
								<div
									key={game.name}
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<div>Nazwa gry: {game.name}</div>
									<div>Założyciel: {game.owner}</div>
									<button onClick={() => props.joinGame(game.name)}>
										Dołącz
									</button>
								</div>
							);
						})}
					</div>
				) : (
					<div>Nie odnaleziono gier... Może założysz własną?</div>
				)}
			</>
		</div>
	);
};
