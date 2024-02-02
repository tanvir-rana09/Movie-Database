import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../Utils/ApiCall"
import { useSelector } from "react-redux"


const Cast = ({ media, id }) => {
	const [casts, setCasts] = useState([])
	const { url } = useSelector(state => state.home)
	useEffect(() => {
		fetchDataFromApi(`/${media}/${id}/credits`).then((res) => {
			setCasts(res.cast)
		}).catch(err => console.log(err))
	}, [media, id])
	return (
		<div>
			<h1 className="text-2xl py-5 pl-5">All casts</h1>
			<div className={`relative flex overflow-y-hidden gap-5 w-full pb-5 mb-0 ${casts?.length > 3 ? 'overflow-x-scroll' : 'overflow-x-hidden'} md:${casts?.length > 7 ? 'overflow-x-scroll' : 'overflow-x-hidden'}`}>
				{
					casts.length>0?(
						casts.filter((cast) => cast.profile_path !== null)
						.map((cast) => (
							<div
								key={cast.id}>
								<div className="w-32 object-cover h-32">
									<img
										className="rounded-lg "
										src={url + cast?.profile_path} alt={cast.original_name} />
								</div>
								<h2 className="text-center">{cast.original_name}</h2>
							</div>
						))
					): <div className="text-center">Cast Members are unknown!!</div>
				}
				</div>

			</div>
	)
}

export default Cast