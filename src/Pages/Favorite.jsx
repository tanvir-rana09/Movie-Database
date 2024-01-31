import { TbMoodEmpty } from "react-icons/tb";
import { useSelector } from "react-redux";
import Card from "../Components/Card";
import { useEffect, useState } from "react";

const Favorite = () => {
	const favorite = useSelector((state) => state.favorite.favorite)
	const url = useSelector((state) => state.home.url)
	const [bg, setBg] = useState('')

	useEffect(() => {
		if (favorite.length > 0) {
			setBg(url + favorite[Math.floor(Math.random() * favorite.length)].backdrop_path)
		}
		else null
	}, [url, favorite])


	if (favorite.length === 0) {
		return (<div >
			<p className="linear2 text-4xl flex justify-center items-center h-[40vh] capitalize">Sorry Your Favorite is empty!!!</p>
			<p className="text-5xl flex items-center justify-center py-20 -mt-56 mb-56"><TbMoodEmpty color="yellow" /></p>
		</div>)
	} else return <div>
		<div className="relative bg-primaryColor/80 h-[40rem] w-full 2xl:px-[15%] ">
			<div className="absolute inset-0 -z-10 h-[40rem] w-full ">
				<img className="h-full w-full object-cover bg-center" src={bg} alt="Upcoming movie banner" />
			</div>
			<div className='absolute text-center left-0 top-3/4 w-full'>
				<h1 className='font-semibold tracking-widest text-center capitalize font-extendfont1 lg:text-5xl text-2xl sm:text-3xl md:text-4xl from-pink-500 bg-gradient-to-r to-yellow-500 bg-clip-text text-transparent'>
					Home|Favorite
				</h1>
			</div>
		</div>
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-10 px-2 md:px-5 2xl:px-[15%] '>
			{
				favorite?.map((item) => (
					<div key={item.id} className='w-full h-full'>
						<Card item={item} className="hidden" deleteItem={true} />
					</div>
				))
			}
		</div>
	</div>
}

export default Favorite