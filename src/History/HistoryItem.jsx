import React from "react";

const HistoryItem = (props) => {
	return (
		<div className="history-item">
			<h2>{props.action.type}</h2>
			<p>
				{props.action.pomodoroTime.minutes}:
				{props.action.pomodoroTime.seconds}
			</p>
			<p>{props.action.realTime}</p>
		</div>
	);
};

export default HistoryItem;
