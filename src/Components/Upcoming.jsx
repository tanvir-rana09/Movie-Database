import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../Utils/ApiCall";
import { useSelector } from "react-redux";
import Logo from "./Logo";

const Upcoming = () => {
	const [data, setData] = useState([])
	const { url } = useSelector((state) => state.home)

	const [current, setCurrent] = useState(0)



	useEffect(() => {
		try {
			fetchDataFromApi(`/movie/upcoming`).then((res) => {
				setData(res.results)
			})
		} catch (error) {
			console.log(error);
		}

	}, [])
	useEffect(() => {
		const next = () => {
			setCurrent((prev) => (prev == data.length - 1 ? 0 : prev+1))
		}
		const interval = setInterval(next, 4000)

		return () => clearInterval(interval)
	}, [data.length])
	return (
		<div>
			<div className="flex min-w-full h-full relative bg-primaryColor/70 "
				style={{
					transform: `translateX(-${current * 100}%)`
				}}
			>
				{data?.map((data, i) => (
					<div className="w-full 2xl:h-[35rem] h-[30rem] min-w-full bg-center z-0"
						key={data.id}>
						<img
							className={`h-full w-full object-cover bg-center -z-20 transition ease-in-out duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
							src={url + data.backdrop_path} alt={data.name} />
						<div className={`absolute top-0 w-full bg-primaryColor/80 h-full pt-14 sm:pt-20 md:pt-32 2xl:px-[15%] transition ease-in-out duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
							<div className="text-center w-full flex justify-center"><Logo /></div>
							<div className="text-center text-5xl uppercase tracking-widest font-extendfont1 font-semibold z-50 from-pink-500 bg-gradient-to-r to-yellow-500 bg-clip-text text-transparent">Upcomming Movie</div>
							<div className=" text-red-500 text-center">Release Date : {data.release_date}</div>
							<div className="text-4xl  bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-extendfont6 text-center mt-10">{data.original_title}</div>
							<p className="sm:px-5 md:px-10 xl:px-16 font-extendfont2 text-xs text-slate-200 text-center">{data.overview}</p>
						</div>
					</div>

				))}
			</div>
		</div>
	)
}

export default Upcoming