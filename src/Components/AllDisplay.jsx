import { Link } from 'react-router-dom'
import { BgImage, Card, Loading } from './Index'
import { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../Utils/ApiCall'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setAllData } from '../Redux/AllData'
import { SlArrowRight } from "react-icons/sl";

const AllDisplay = ({ category, title, params, paths = '', classname,media }) => {
	const dispatch = useDispatch()
	const [pagination, setPagination] = useState(1)
	const allData = useSelector((state) => state.allData.allData)
	const loader = useSelector((state) => state.allData.loading)


	useEffect(() => {
		dispatch(setLoading(true))
		try {
			fetchDataFromApi(`${category}?page=${pagination}`).then((res) => {
				dispatch(setAllData(res.results))
				dispatch(setLoading(false))
			})
		} catch (error) {
			console.log(error);
		}
	}, [category, dispatch, pagination])

	const inc = () => {
		setPagination(pagination+1)
	}

	const dec = () => {
		if (pagination > 1) {
			setPagination(pagination-1)
		} else setPagination(1)
	}

	return (
		<div>
			<BgImage category={`${category}`} title={title} params={params} forCard='flex-row' />
			<div
				className='bg-gray-500/10 py-3 px-5 capitalize flex gap-2 items-center  text-gray-300'>
				<Link>Home</Link> <SlArrowRight /> <p>{paths ? paths : ''}</p> <SlArrowRight /> {params?.replace(/_/g, ' ')}
			</div>
			{
				loader ? <Loading /> : (
					<div>
						<div></div>
						<div className={`${classname ? classname : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 '}mt-10 px-2 md:px-5 2xl:px-[15%]`}>
							{
								allData?.map((item) => (
									<div key={item.id} className='w-full h-full'>
										<Card item={item} media={media}/>
									</div>
								))
							}
						</div>
						<div className='grid place-content-center my-5 h-full'>
							<div className='flex items-center border'>
							<button className=' px-4 py-2 hover:bg-cyan-500 bg-white text-black font-semibold hover:text-white duration-300 tracking-wider ' onClick={dec}>Prev Page</button>
							<div className='px-6 py-2 bg-white text-black'>{pagination}</div>
							<button className=' px-4 py-2 hover:bg-cyan-500 bg-white text-black font-semibold hover:text-white grid duration-300 tracking-wider ' onClick={inc}>Next Page</button>
							</div>
						</div>
					</div>
				)
			}


		</div>
	)
}

export default AllDisplay