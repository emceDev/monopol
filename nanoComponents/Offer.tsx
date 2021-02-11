import { tradeAtom } from "../state/atom";

async function trade(x, data, gameName) {
	const observer = await fetch("api/Trade", {
		method: "POST",
		body: JSON.stringify({
			x: x,
			gameName: gameName,
			data: data,
		}),
	});
	let response = await observer.json();
	console.log(response);
}
export const Offer = (props) => {
	function log() {
		console.log(props);
	}
	return (
		<div className="Offer">
			<button onClick={() => log()}>log</button>
			<div>
				<p> Gracz {props.trade.giver} chce wziąść:</p>
				Pieniądze {props.trade.demands.money}
				<p>
					Pola:
					{props.trade.demands.cards?.map((x) => x)}
				</p>
			</div>
			<div>
				<p>w zamian chce dać:</p>
				Pieniądze {props.trade.offerings.money}
				<p>Pola :{props.trade.offerings.cards?.map((x) => x)}</p>
			</div>
			<div>
				<button
					onClick={() => {
						trade(true, props.trade, props.gameName);
					}}
				>
					Accept
				</button>
				<button
					onClick={() => {
						trade(false, props.trade, props.gameName);
					}}
				>
					Reject
				</button>
			</div>
		</div>
	);
};
