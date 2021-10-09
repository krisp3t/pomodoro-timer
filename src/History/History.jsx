import React from "react";

const History = (props) => {
	const actionItems = props.items.map((action) => (
		<li key={action.key}>{JSON.stringify(action)}</li>
	));
	return <div className="history">{actionItems}</div>;
};

export default History;
