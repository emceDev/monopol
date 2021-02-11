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
	return (
		<div className="Offer">
			<div>
				<p> Gracz {props.trade.receiver} chce:</p>
				Pieniądze {props.trade.demands.money}
			</div>
			<div>
				<p>w zamian za:</p>
				Pieniądze {props.trade.offerings.money}
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
