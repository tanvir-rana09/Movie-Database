import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./HomeSlice";
import allData from "./AllData";
import favoriteSlice from "./Favorite";
import SearchSlice from './searchSlice';
const store=configureStore({
	reducer:{
		home:HomeSlice,
		allData:allData,
		favorite:favoriteSlice,
		search:SearchSlice
	}
});
export default store