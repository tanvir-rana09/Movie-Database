import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	searchItem: '',
	loading: false,
}

const SearchSlice = createSlice({
	name: 'searchItem',
	initialState,
	reducers: {
		setSearchItem: (state, action) => {
			state.searchItem = action.payload
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		}
	}
})

export default SearchSlice.reducer;
export const { setSearchItem, setLoading } = SearchSlice.actions;