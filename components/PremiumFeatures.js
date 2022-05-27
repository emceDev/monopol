import { useEffect, useState } from "react";

// shown?<><>
export const PremiumFeatures = (props) => {
	const [shown, setShown] = useState(false);
	const [premiumFeatures, setPremiumFeatures] = useState(undefined);

	async function getFeatures() {
		const res1 = await fetch("api/getPremiumFeatures", {
			method: "GET",
		});
		const res2 = await res1.json();
		setPremiumFeatures(res2);
	}
	useEffect(() => {
		getFeatures();
	}, []);
	return shown === true && premiumFeatures !== undefined ? (
		<div className="PremiumFeatures">
			{premiumFeatures.map((x) => (
				<PremiumFeature
					t={x.title}
					d={x.description}
					f={x.features}
					p={x.price}
				/>
			))}
			<button
				id="PFCloseButton"
				onClick={() => {
					setShown(false);
				}}
			>
				Zamknij
			</button>
		</div>
	) : (
		<button
			id="PFShowButton"
			onClick={() => {
				setShown(true);
			}}
		>
			Dodatkowe funkcje
		</button>
	);
};

const PremiumFeature = (props) => {
	const [commentBoxShown, setCommentBoxShown] = useState(false);
	const [showLike, setShowLike] = useState(true);
	const [showBuy, setShowBuy] = useState(true);
	const [comment, setComment] = useState("");

	async function likeBuyComment(type, title) {
		const res1 = await fetch("api/Premium", {
			method: "POST",
			body: JSON.stringify({
				title: title,
				type: type,
				comment: comment,
			}),
		});
		const res2 = await res1.json();
		res2;
		console.log(type === "likes");
		if (type === "buys") {
			setShowBuy(false);
		} else if (type === "likes") {
			setShowLike(false);
		}
	}

	return (
		// PF stands for premium feature
		<div className="PFContainer" key={props.t} id={props.t}>
			<p className="PFTitle">{props.t}</p>
			<p className="PFDescription">{props.d}</p>
			<ul className="PFFeatureList">
				{props.f.map((x) => (
					<li>{x}</li>
				))}
			</ul>
			<p className="PFPrice">Price: {props.p}</p>
			<div className="PFButtonContainer">
				<button
					style={{ display: showLike ? "box" : "none" }}
					id={props.t + "PFButtonLike"}
					onClick={() => likeBuyComment("likes", props.t)}
				>
					Podoba mi się!
				</button>
				{/* <button
					style={{ display: showBuy ? "box" : "none" }}
					id={props.t + "PFButtonBuy"}
					onClick={() => likeBuyComment("buys", props.t)}
				>
					Kupiłbym!
				</button> */}
				<button
					id={props.t + "PFButtonComment"}
					onClick={() => setCommentBoxShown(!commentBoxShown)}
				>
					Chcę skomentować.
				</button>
			</div>
			<div
				className="PFCommentContainer"
				style={{ display: commentBoxShown ? "flex" : "none" }}
			>
				<input
					id={props.t + "PFCommentInput"}
					type="text"
					placeholder="Your comment about feature"
					onChange={(e) => setComment(e.target.value)}
				/>
				<button
					id={props.t + "PFButtonSendComment"}
					onClick={() => likeBuyComment("comment", props.t)}
				>
					Send
				</button>
			</div>
		</div>
	);
};
