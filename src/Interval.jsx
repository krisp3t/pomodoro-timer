import React from "react";

const formatDate = (input) => input.toString().padStart(2, 0);

const Interval = (props) => {
	let minutes = Math.floor(props.timestamp / 60);
	let seconds = props.timestamp % 60;

	return (
		<React.Fragment>
			{formatDate(minutes)}:{formatDate(seconds)}
		</React.Fragment>
	);
};

export default Interval;
