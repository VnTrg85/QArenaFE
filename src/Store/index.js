import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import notificationReducer from "./notificationSlice";
import testProjectSlice from "./testProjectSlice";
const store = configureStore({
	reducer: {
		session: sessionReducer,
		notification: notificationReducer,
		currentProject: testProjectSlice,
	},
});

export default store;
