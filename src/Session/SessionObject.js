import { timestampToOutput } from "./Interval";

const sessionColors = {
	WORKING_END: "green.100",
	BREAK_END: "gray.100",
	PAUSE_END: "red.100",
};

class SessionObject {
	constructor(type, timestamp) {
		this.type = type; /* WORKING_END, BREAK_END, PAUSE_END */
		this.startedTimestamp = timestamp; /* Date.now() at session start */
		this.completedTimestamp = Date.now();
		this.diffTimestamp =
			this.completedTimestamp - this.startedTimestamp; /* ms */
		this.sessionLength = timestampToOutput(
			this.completedTimestamp - this.startedTimestamp
		); /* minutes:seconds */
		this.startedTime = new Date(this.startedTimestamp)
			.toTimeString()
			.slice(0, 5); /* minutes:seconds */
		this.completedTime = new Date(this.completedTimestamp)
			.toTimeString()
			.slice(0, 5); /* minutes:seconds */
		this.key = type + this.completedTimestamp;
		this.bgColor = sessionColors[this.type];
	}
}

export default SessionObject;
