import React from "react";
import HistoryItem from "./HistoryItem";

const History = (props) => {
	const actionItems = props.items
		.filter((action) => {
			return ["WORKING_END", "PAUSE_END"].includes(action.type);
		})
		.filter((action) => {
			return action.type !== "PAUSE_END" || action.pauseLength > 0;
		})
		.map((action) => <HistoryItem key={action.key} action={action} />);
	return (
		<div className="history">
			<button onClick={props.clear}>Clear</button>
			{actionItems}
		</div>
	);
};

export default History;
