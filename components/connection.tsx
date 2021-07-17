import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { mainPlayerData } from "../state/atom";
import {
	mainGameData,
	gameNameAtom,
	playersAtom,
	cardsAtom,
} from "../state/atom";
import dynamic from "next/dynamic";
// import {  } from "peerjs/index/Peer";

export const Connection = () => {
	// const [connect, setConnect] = useState(null);
	const [listen, setListen] = useState(null);
	const [stream, setStream] = useState(null);
	const [peer, setPeer] = useState(null);
	const [text, setText] = useState("");

	useEffect(() => {
		console.log(peer);
		connSet();
		// Peer1.then((x) => console.log(x));
		// window.document === undefined ? null : console.log(window);
	}, []);

	async function connSet() {
		const Peer = (await import("peerjs")).default;
		let peerState = new Peer();
		setPeer(await peerState);
		console.log(peer?.id);
		return peerState;
	}

	async function connectTo() {
		let conn = peer.connect(listen);
		conn.on("open", () => {
			console.log("conected");
			conn.send(text);
		});
		conn.on("data", (data) => {
			// Will print 'hi!'
			console.log(data);
		});
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
			(stream) => {
				peer.call(listen, stream);
				conn.on("stream", (remoteStream) => {
					console.log("stream");
					// Show stream in some <video> element.
				});
			},
			(err) => {
				console.error("Failed to get local stream", err);
			}
		);
	}

	async function listenTo() {
		console.log("listening on", peer.id);
		peer.on("connection", (conn) => {
			conn.on("data", (data) => {
				// Will print 'hi!'
				console.log(data);
			});
			conn.on("open", () => {
				conn.send(text);
			});
			conn.on("call", (call) => {
				console.log("someone calling");
			});
		});
	}

	async function call() {
		console.log("Calling");
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
			(stream) => {
				const call = peer.call(listen, stream);
				call.on("stream", (remoteStream) => {
					console.log("stream");
					// Show stream in some <video> element.
				});
			},
			(err) => {
				console.error("Failed to get local stream", err);
			}
		);
	}
	return (
		<div className="SearchBar">
			<input
				placeholder="ur message here"
				onChange={(e) => setText(e.target.value)}
			/>
			<input placeholder="liste" onChange={(e) => setListen(e.target.value)} />
			<button onClick={() => connectTo()}>Connect</button>
			{peer?.id}
			<button onClick={() => listenTo()}>Listen</button>
			<button onClick={() => call()}>Call</button>
			<button onClick={() => console.log(peer)}>Log</button>
			<video
				muted={true}
				src={stream === null ? null : stream}
				onLoadedMetadata={(e) => {
					e.currentTarget.play();
				}}
			></video>
		</div>
	);
};
