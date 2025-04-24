import { createSlice } from "@reduxjs/toolkit";

const searchProductSlice = createSlice({
	name: "searchProdcts",
	initialState: {
		productDetails: [],
	},
	reducers: {
		setSearchProductDetails: (state, action) => {
			state.productDetails = action.payload;
		},
		removeProductDetails: (state) => {
			state.productDetails = [];
		},
	},
});

export const { setSearchProductDetails, removeProductDetails } = searchProductSlice.actions;
export const searchProductsReducer = searchProductSlice.reducer;
