import { useEffect, useState } from "react";
export const NewsFeed = (props) => {
	const [shown, setShown] = useState(false);

	return (
		<div
			className="NewsFeed"
			// onMouseEnter={() => setShown(true)}
			// onMouseLeave={() => {
			// 	setShown(false);
			// }}
			// style={{
			// 	maxHeight: shown ? "50vh" : "15vh",
			// 	backgroundColor: shown ? "#8a2be2" : "#8a2be278",
			// }}
		>
			<ol>
				{props.news?.map((news) => (
					<li>{news}</li>
				))}
			</ol>
		</div>
	);
};
