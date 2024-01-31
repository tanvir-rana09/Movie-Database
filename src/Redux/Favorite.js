import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	favorite: [],
	loading: false,
}

const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		addFavorite: (state, action) => {
			state.favorite.push(action.payload)
		},
		removeFromFavorite: (state, action) => {
			state.favorite = state.favorite.filter((item) => item.id !== action.payload)
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		}
	}
})

export default favoriteSlice.reducer;
export const { addFavorite, setLoading ,removeFromFavorite} = favoriteSlice.actions;