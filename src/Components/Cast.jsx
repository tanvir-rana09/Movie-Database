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
			<div className="relative flex overflow-x-scroll overflow-y-hidden gap-5 w-full pb-5 mb-10">
				{
					casts.filter((cast) => cast.profile_path !== null)
						.map((cast) => (
							<div
								key={cast}>
								<div className="w-32 object-cover h-32">
									<img
										className="rounded-lg "
										src={url + cast?.profile_path} alt={cast.original_name} />
								</div>
								<h2>{cast.original_name}</h2>
							</div>
						))
				}
				
			</div>
		</div>
	)
}

export default Cast