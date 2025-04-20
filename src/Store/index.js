import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import notificationReducer from "./notificationSlice";
const store = configureStore({
	reducer: {
		session: sessionReducer,
		notification: notificationReducer,
	},
});

export default store;
