import { createSlice } from "@reduxjs/toolkit"

const initialState={
	genras:null,
	url:"https://image.tmdb.org/t/p/original",
	data:null,
}

const HomeSlice = createSlice({
	name:"home",
	initialState,
	reducers:{
		getGenras:(state,action)=>{
			state.genras=action.payload
		},
		getUrl:(state,action)=>{
			state.url=action.payload
		},
		getData:(state,action)=>{
			state.data=action.payload
		}
	}
})

export const {getData,getUrl,getGenras} =HomeSlice.actions;
export default HomeSlice.reducer;