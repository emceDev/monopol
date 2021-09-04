import Head from "next/head";
import { SearchBar } from "../components/SearchBar";
import { PlayerCard } from "../microComponents/PlayerCard";
import { GameData } from "../components/GameData";
import { useRecoilState } from "recoil";
import { mainPlayerData, hintAtom } from "../state/atom";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Home = () => {
	const [mainPlayer, setMainPlayer] = useRecoilState(mainPlayerData);
	const [data, setData] = useState(null);
	const [hint, setHintAtom] = useRecoilState(hintAtom);
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
		<div className="Home">
			<Head>
				<title>Monopolowi</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<div className="Hint"></div>
				{"Witaj w monopolowych " + mainPlayer.name + " " + hint}
				<SearchBar />
				<GameData />
			</div>
		</div>
	);
};
export default Home;
