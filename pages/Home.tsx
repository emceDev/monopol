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
		if (mainPlayer.loggedIn === false) {
			router.push("/");
		} else {
			// setData(observ());
		}
	}, [mainPlayer.loggedIn]);

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<SearchBar />

				<GameData />
			</div>
		</div>
	);
};
export default Home;
