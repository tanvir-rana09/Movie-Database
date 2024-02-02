import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../Utils/ApiCall"


const MoreDetails = ({ media, id }) => {
	const [detail, setDetail] = useState()

	useEffect(() => {
		fetchDataFromApi(`/${media}/${id}`).then((res) => {
			setDetail(res)
		}).catch((error) => console.log(error))
	}, [id, media])
	return (
		<div>
			<h1 className="text-2xl py-5">More Details</h1>
			<div className="flex"> Status : <p className="text-green-500 ml-2"> {detail?.status} </p> </div>
			{media === 'tv'? <div>
				<div>Last air date : {detail?.last_air_date}</div>
				<div>First air date : {detail?.first_air_date}</div>
				<div>Total Episodes : {detail?.number_of_episodes}</div>
				<div>Total Seasons : {detail?.number_of_seasons}</div>
				
			</div>:null}
			{detail?.type&&<div>Type : {detail?.type}</div>}
			{detail?.spoken_languages && <div className="flex flex-wrap">
				<p>Spoken Languages : </p>
				<ul className="flex flex-wrap">
					{detail?.spoken_languages.map((name, i) => (
						<li className="ml-2 text-cyan-500" key={i}>{name.english_name},</li>
					))}
				</ul>
			</div>}
			{detail?.budget && <div>
				<div className="flex gap-1.5">Budget : <p className="text-cyan-400 font-thin">{(detail?.budget > 0 ? detail?.budget : "Unknown") || detail?.budget || 'Unknown'}$</p></div>
				<div className="flex gap-1.5">Revenue : <p className="text-cyan-400 font-thin">{(detail?.revenue > 0 ? detail?.revenue : "Unknown") || detail?.revenue || 'Unknown'}$</p></div>
			</div>}
			<div className="flex items-center gap-3">
				<ul className="flex gap-2 flex-wrap">
					Genras :
					{detail?.genres.map((name, i) => (
						<li className="text-cyan-500 " key={i}>{name.name},</li>
					))}
				</ul>
			</div>
			{detail?.runtime && <div className="flex gap-2">Runtime : <p className="text-cyan-500">{detail?.runtime}min</p></div>}
		</div>
	)
}

export default MoreDetails