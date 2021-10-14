import { calculateMinSec } from "./Interval";

const sessionColors = {
	WORKING_END: "green.100",
	BREAK_END: "gray.100",
	PAUSE_END: "red.100",
};

class SessionObject {
	constructor(type, timestamp) {
		this.type = type;
		this.pomodoroTime = calculateMinSec(timestamp);
		this.timeDisplay = new Date().toTimeString().slice(0, 5);
		this.realTime = Date.now();
		this.key = type + this.realTime;
		this.bgColor = sessionColors[this.type];
	}
}

export default SessionObject;
