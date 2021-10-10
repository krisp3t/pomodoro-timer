import React from "react";
import HistoryItem from "./HistoryItem";

const History = (props) => {
	const actionItems = props.items.map((action) => (
		<HistoryItem key={action.key} action={action} />
	));
	return (
		<div className="history">
			<button onClick={props.clear}>Clear</button>
			{actionItems}
		</div>
	);
};

export default History;
