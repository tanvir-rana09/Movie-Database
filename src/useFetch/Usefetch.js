import { useEffect } from "react";
import { useState } from "react"
import { fetchDataFromApi } from "../Utils/ApiCall";

const useFetch = (url)=>{
	const [loading,setLoading] = useState(false);
	const [data,setData]=useState(null);

	useEffect(()=>{
		setLoading(true);
		setData(null)

		fetchDataFromApi(url).then((res)=>{
			setData(res)
			setLoading(false)
		}).catch(error => console.log(error))
	},[url])

	return {data,loading};
}

export default useFetch;