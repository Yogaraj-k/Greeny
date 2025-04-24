import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "SearchValue",
	initialState: {
		search: "",
	},
	reducers: {
		setSearchValue: (state, action) => {
			state.search = action.payload;
		},
	},
});

export const { setSearchValue } = searchSlice.actions;
export const searchValReducer = searchSlice.reducer;
