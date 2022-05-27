import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { hintAtom } from "../state/atom";
const tips = { position: "fixed", left: "10vw", top: "10vw" };

export const Tips = () => {
	const [shown, setShown] = useState(false);
	const [hint, setHintAtom] = useRecoilState(hintAtom);
	useEffect(() => {
		console.log("tipChanged");
		console.log(hint);
		setShown(true);
		setTimeout(() => {
			setShown(false);
		}, 5000);
	}, [hint]);
	return <div style={tips}>{hint}</div>;
};
