export const formatTime = (input) => input.toString().padStart(2, 0);
export const calculateMinSec = (timestamp) => {
    if (timestamp < 0) {
        timestamp = 0;
    }
    const minutes = Math.floor(timestamp / 60);
    const seconds = timestamp % 60;
    return `${formatTime(minutes)}:${formatTime(seconds)}`;
};
export const timestampToOutput = (timestamp) => {
    return calculateMinSec(Math.round(timestamp / 1000));
};

export default function Interval(props) {
    return (timestampToOutput(props["timestamp"]));
};

