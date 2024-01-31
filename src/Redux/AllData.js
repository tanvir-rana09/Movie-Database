import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	allData: [],
	loading: false,
}

const allData = createSlice({
	name: 'movie slice',
	initialState,
	reducers: {
		setAllData: (state, action) => {
			state.allData=action.payload
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		}
	}
})

export default allData.reducer;
export const { setAllData, setLoading } = allData.actions;