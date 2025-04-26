import { createSlice } from "@reduxjs/toolkit";

const testProjectSlice = createSlice({
	name: "testProject",
	initialState: null,
	reducers: {
		setCurrentProject: (state, action) => {
			return action.payload;
		},
	},
});

export const { setCurrentProject } = testProjectSlice.actions;
export default testProjectSlice.reducer;
