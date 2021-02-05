import { useEffect } from "react";
export const NewsFeed = (props) => {
	useEffect(() => {
		console.log("NEwSSDSADASDSASDS");
		console.log(props);
	}, []);
	return <div className="NewsFeed">{props.news?.text}</div>;
};
