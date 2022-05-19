import { useEffect, useState } from "react";
import { NewsFeedQuestion } from "../nanoComponents/NewsFeedQuestion";
export const NewsFeed = (props) => {
	const [shown, setShown] = useState(false);

	return (
		<div
			className="NewsFeed"
		>
			<NewsFeedQuestion/>
			<ol>
				{props.news?.map((news) => (
					<li>{news}</li>
				))}
			</ol>
		</div>
	);
};

