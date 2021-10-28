import { timestampToOutput } from "./Interval";

const sessionColors = {
	WORKING_END: "green.100",
	BREAK_END: "gray.100",
	PAUSE_END: "red.100",
};

class SessionObject {
	constructor(type, timestamp) {
		this.type = type;
		this.startedTimestamp = timestamp;
		this.completedTimestamp = Date.now();
		this.sessionLength = timestampToOutput(
			this.completedTimestamp - this.startedTimestamp
		);
		this.startedTime = new Date(this.startedTimestamp)
			.toTimeString()
			.slice(0, 5);
		this.completedTime = new Date(this.completedTimestamp)
			.toTimeString()
			.slice(0, 5);
		this.key = type + this.completedTimestamp;
		this.bgColor = sessionColors[this.type];
	}
}

export default SessionObject;

// this.startedTime = this.startedTimestamp.toTimeString().slice(0, 5);
// this.completedTime = this.completedTimestamp.toTimeString().slice(0, 5);
