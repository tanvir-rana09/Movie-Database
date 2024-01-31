import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchDataFromApi } from './../Utils/ApiCall';
import Loading from "./Loading";
import { Link } from "react-router-dom";
import bgImg from '../assets/pexels-nathan-engel-436413.jpg'

const BgImage = ({ category, title = '', params = '', details }) => {

	const url = useSelector((state) => state.home.url)
	const [bg, setBg] = useState('')
	const [loading, setLoading] = useState(true)

	// useEffect(() => {
	// 	fetchDataFromApi(category).then((res) => {
	// 		const background = res.results[Math.floor(Math.random() * res.results.length)].backdrop_path;
	// 		background === undefined ? setBg(bgImg) : setBg(url + background)
	// 		setLoading(false)
	// 	}).catch((error) => console.log(error))
	// }, [category, url])

	// useEffect(() => {
	// 	fetchDataFromApi(details).then((res) => {
	// 		console.log(res);
	// 		const background = res.backdrop_path ? setBg(res.backdrop_path) : setBg(res.poster_path)
	// 		background === undefined ? setBg(bgImg) : setBg(url + background)
	// 		setLoading(false)
	// 	}).catch((error) => console.log(error))
	// }, [details,url])

	useEffect(() => {
		if (details) {
			fetchDataFromApi(details).then((res) => {
				setBg(url+res.backdrop_path)
				// console.log(res);
				// const background = res.backdrop_path ? setBg(res.backdrop_path) : setBg(res.poster_path)
				// background === undefined ? setBg(bgImg) : setBg(url + background)
				setLoading(false)
			}).catch((error) => console.log(error))
		} else {
			fetchDataFromApi(category).then((res) => {
				const background = res.results[Math.floor(Math.random() * res.results.length)].backdrop_path;
				background === undefined ? setBg(bgImg) : setBg(url + background)
				setLoading(false)
			}).catch((error) => console.log(error))
		}
	}, [details,category,url])



	return loading ? <Loading /> : (
		<div>
			<div className="relative bg-primaryColor/70 h-[40rem] w-full 2xl:px-[15%] ">
				<div className="absolute inset-0 -z-10 h-[40rem] w-full ">
					<img className="h-full w-full object-cover bg-center" src={bg ? bg : bgImg} alt="Upcoming movie banner" />
				</div>
				<div className='absolute text-center left-0 top-3/4 w-full'>
					<h1 className='font-semibold tracking-widest text-center capitalize font-extendfont1 lg:text-5xl text-2xl sm:text-3xl md:text-4xl from-pink-500 bg-gradient-to-r to-yellow-500 bg-clip-text text-transparent'>
						{params && <Link className="font-extendfont1" to='/'>Home|</Link>}{params?.replace(/_/g, ' ')} {title}
					</h1>
				</div>
			</div>
		</div>
	)
}

export default BgImage