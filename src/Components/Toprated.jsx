import { useEffect, useState } from "react"
import { Carousel,Loading } from "./Index"
import { fetchDataFromApi } from "../Utils/ApiCall"

const Toprated = () => {

  const [media,setMedia]=useState('tv')
	const [data, setData] = useState([])
  const [loader,setLoader]=useState(true)
	useEffect(() => {
		try {
			fetchDataFromApi(`/${media}/top_rated`).then((res) => {
				setData(res.results)
        setLoader(false)
			})
		} catch (error) {
			console.log(error);
		}
	}, [media,loader])

  return loader? <Loading/>:(
    <div>
    <div className='flex justify-between 2xl:px-[15%] sm:px-5 px-2 bg-gray-400/20 my-10 py-2 items-center '>
      <h2 className='sm:text-xl'>Top Rated</h2>
      <div className=' flex rounded-full border-2 border-primaryColor'>
        <button
          className={`px-5 py-1 rounded-full duration-300  ${media === 'tv' ? 'bg-primaryColor text-white' : 'hover:bg-gray-600/20'}`}
          onClick={() => setMedia('tv')}
        >TV Show</button>
        <button
          className={`px-5 py-1 rounded-full duration-300 ${media === 'movie' ? 'bg-primaryColor text-white' : 'hover:bg-gray-600/20'}`}
          onClick={() => setMedia('movie')}
        >Movie</button>
      </div>
    </div>
    <div className="mb-10">
      <Carousel data={data} media={media}/>
    </div>
  </div>
  )
   
  
}

export default Toprated