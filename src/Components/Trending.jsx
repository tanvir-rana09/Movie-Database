
import { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../Utils/ApiCall';
import { Carousel } from './Index';
const Trending = () => {
	const [time, setTime] = useState('day')
	const [data, setData] = useState([])

	useEffect(() => {
		try {
			fetchDataFromApi(`/trending/movie/${time}`).then((res) => {
				setData(res.results)
				
			})
		} catch (error) {
			console.log(error);
		}
	}, [time])
	return (
		<div>
			<div className='flex justify-between 2xl:px-[15%] sm:px-5 px-2 bg-gray-400/20 my-5 py-2 items-center mt-20'>
				<h2 className='sm:text-xl'>Trending</h2>
				<div className=' flex rounded-full border-2 border-primaryColor'>
					<button
					className={`px-5 py-1 rounded-full duration-300  ${time==='day'? 'bg-primaryColor text-white':'hover:bg-gray-600/20' }`}
					onClick={() => setTime('day')}
					>Today</button>
					<button
					className={`px-5 py-1 rounded-full duration-300 ${time==='week'? 'bg-primaryColor text-white':'hover:bg-gray-600/20' }`}
					onClick={() => setTime('week')}
					>This Week</button>
				</div>
			</div>
			<Carousel data={data} media='movie'/>
		</div>
	)
}

export default Trending