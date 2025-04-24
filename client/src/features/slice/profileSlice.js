import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "userdetails",
	initialState: {
		profileData: "",
	},
	reducers: {
		setProfilePicture: (state, action) => {
			state.profileData = action.payload;
		},
	},
});

export const { setProfilePicture } = userSlice.actions;
export const userProfileReducer = userSlice.reducer;
