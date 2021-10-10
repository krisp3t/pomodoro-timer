import { calculateMinSec } from "./Interval";

class SessionObject {
	constructor(type, timestamp) {
		this.type = type;
		this.pomodoroTime = calculateMinSec(timestamp);
		this.timeDisplay = new Date().toTimeString().slice(0, 5);
		this.realTime = Date.now();
		this.key = type + this.realTime;
	}
}

export default SessionObject;
