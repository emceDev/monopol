import Head from "next/head";
import { SearchBar } from "../components/SearchBar";
import { GameData } from "../components/GameData";
import { useRecoilState,useRecoilValue } from "recoil";
import { mainPlayerData, hintAtom,mainGameData } from "../state/atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {PremiumFeatures} from '../components/PremiumFeatures'
import { Login } from "../microComponents/Login";
import { CreatePlayer } from "../microComponents/CreatePlayer";
import {Tips} from '../microComponents/Tips'

const Home = () => {
	const [mainPlayer, setMainPlayer] = useRecoilState(mainPlayerData);
	const gameData = useRecoilValue(mainGameData);
	const [data, setData] = useState(null);
	const [hint, setHintAtom] = useRecoilState(hintAtom);
	const [logRegModal, setLogRegModal] = useState(false);
	const router = useRouter();
	
	useEffect(() => {
		setHintAtom('Zostajesz przekierowany do głównego menu, aby się zarejestrować wybierz przycisk loguj w lewym górnym rogu ekranu')
		if (mainPlayer.name === (undefined || null)) {
			router.push("/");
		} else {
			console.log(mainPlayer);
			// setData(observ());
		}
	}, [mainPlayer]);

	return (
		<div className="Home">
			<Tips/>
			<Head>
				<title>Monopolowi</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
			{gameData.name===null?<div>
				<SearchBar />
				<PremiumFeatures/>
				<button onClick={()=>{setLogRegModal(!logRegModal)}}>{!logRegModal?'Zaloguj':'Zamknij'}</button>
				{logRegModal?<div className="LoginPanel">
					<Login/><CreatePlayer/>
				</div>:null}
				</div>:<GameData />}
				
			</div>
		</div>
	);
};
export default Home;
