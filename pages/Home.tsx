import Head from "next/head";
import { SearchBar } from "../components/SearchBar";
import { PlayerCard } from "../microComponents/PlayerCard";
import { GameData } from "../components/GameData";
import { useRecoilState } from "recoil";
import { mainPlayerData } from "../state/atom";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Home = () => {
	const [mainPlayer, setMainPlayer] = useRecoilState(mainPlayerData);
	const [data, setData] = useState(null);

	const router = useRouter();
	useEffect(() => {
		if (mainPlayer.name === (undefined || null)) {
			router.push("/");
		} else {
			console.log(mainPlayer);
			// setData(observ());
		}
	}, [mainPlayer]);

	return (
		<div>
			<Head>
				<title>Monopolowi</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				{"Witaj " + mainPlayer.name}
				<SearchBar />
				<GameData />
			</div>
		</div>
	);
};
export default Home;
