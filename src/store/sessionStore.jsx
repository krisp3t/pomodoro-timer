import { configureStore } from "@reduxjs/toolkit";

const sessionReducer = (state, action) => {
	if (action.type === "session/active") {
		return state;
	}
};

export default configureStore({
	reducer: sessionReducer,
});
