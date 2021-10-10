import React from "react";

import styles from "./HistoryItem.module.css";
import { calculateMinSec } from "../Session/Interval";

const ActionCompleted = (props) => {
	return (
		<React.Fragment>
			<h2>{props.title}</h2>
			{/* icon */}
			<p>{props.action.pomodoroTime}</p>
			<p>{props.action.timeDisplay}</p>
			{props.action.break && <p>Break Completed</p>}
			{props.action.pauseLength > 0 && (
				<p>
					Pause taken for {calculateMinSec(props.action.pauseLength)}
				</p>
			)}
		</React.Fragment>
	);
};

const HistoryItem = (props) => {
	let content;
	switch (props.action.type) {
		case "WORKING_END":
			content = (
				<ActionCompleted
					title="Pomodoro Completed"
					icon={null}
					action={props.action}
				/>
			);
			break;
		case "PAUSE_END":
			content = (
				<ActionCompleted
					title="Pause"
					icon={null}
					action={props.action}
				/>
			);
			break;
		default:
			break;
	}
	return <div className={styles["history-item"]}>{content}</div>;
};

export default HistoryItem;
