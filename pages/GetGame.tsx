import { app } from "./api/config/firebase";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = async () => {
	let x = await fetch("api/GetGame", {
		method: "POST",
		body: JSON.stringify({
			game: "123",
		}),
	});
	return x;
};

export default function GetGame() {
	const { data, error } = useSWR("/api/GetGame", fetcher, {
		refreshInterval: 1000,
	});
	useEffect(() => {
		console.log(data);
	}, [data]);
	return (
		<div
			onClick={() => {
				console.log(data);
			}}
		>
			asd
		</div>
	);
}
