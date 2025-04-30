import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
	name: "session",
	initialState: [],
	reducers: {
		addSession: (state, action) => {
			state.push(action.payload);
		},
		markSessionDone: (state, action) => {
			const index = state.findIndex(t => t.id === action.payload.id);
			if (index !== -1) {
				state[index] = action.payload;
			}
		},
	},
});

export const { addSession, markSessionDone } = sessionSlice.actions;
export default sessionSlice.reducer;

export const selectSessionDoing = (state, id) => {
	for (let i = 0; i < state.session?.length; i++) {
		const element = state.session[i];
		if (element?.testProject?.id == id && element.status == "doing") {
			return element;
		}
	}
};
