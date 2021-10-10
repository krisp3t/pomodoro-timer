import { calculateMinSec } from "./Interval";

class SessionObject {
	constructor(type, timestamp) {
		this.type = type;
		this.pomodoroTime = calculateMinSec(timestamp);
		this.realTime = new Date().toTimeString().slice(0, 5);
		this.key = type + Date.now();
	}
}

export default SessionObject;
