import { useEffect, useState } from "react";
export const NewsFeed = (props) => {
	const [shown, setShown] = useState(false);
	useEffect(() => {
		console.log("NEwSSDSADASDSASDS");
		console.log(props);
	}, []);
	return (
		<div
			className="NewsFeed"
			onMouseEnter={() => setShown(true)}
			onMouseLeave={() => {
				setShown(false);
			}}
			style={{ height: shown ? "20vh" : "5vh" }}
		>
			<ol>
				{props.news?.map((news) => (
					<li>{news}</li>
				))}
			</ol>
		</div>
	);
};
