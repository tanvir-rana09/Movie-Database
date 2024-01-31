
const TMBD_TOKEN = import.meta.env.VITE_APP_TMBD_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
	Authorization: "bearer " + TMBD_TOKEN
}

export const fetchDataFromApi = async (url, params) => {
	try {
		const data = await fetch(BASE_URL + url, { headers, params })
		const response = await data.json();
		return response
	} catch (error) {
		console.log(error)
	}
} 