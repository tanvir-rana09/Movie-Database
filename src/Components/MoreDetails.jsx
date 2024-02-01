import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../Utils/ApiCall"


const MoreDetails = ({ media, id }) => {
	const [detail, setDetail] = useState()

	useEffect(() => {
		fetchDataFromApi(`/${media}/${id}`).then((res) => {
			setDetail(res)
			console.log(res);
		}).catch((error) => console.log(error))
	}, [id, media])
	return (
		<div>
			<div className="flex"> Status : <p className="text-green-500 ml-2"> {detail?.status} </p> </div>
			{detail?.spoken_languages && <div className="flex">
				<p>Spoken Languages : </p>
				<ul className="flex">
					{detail?.spoken_languages.map((name,i) => (
						<li className="ml-2 text-cyan-500" key={i}>{name.english_name},</li>
					))}
				</ul>
			</div>}
			{detail?.budget && <div>
				<div className="flex gap-1.5">Budget : <p className="text-cyan-400">{(detail?.budget > 0 ? detail?.budget : "Unknown") || detail?.budget || 'Unknown'}$</p></div>
				<div className="flex gap-1.5">Revenue : <p className="text-cyan-400">{(detail?.revenue > 0 ? detail?.revenue : "Unknown") || detail?.revenue || 'Unknown'}$</p></div>
			</div>}
			<div className="flex items-center gap-3">
				<ul className="flex gap-2">
					Genras :
					{detail?.genres.map((name,i) => (
						<li className="text-cyan-500 " key={i}>{name.name},</li>
					))}
				</ul>
			</div>
				{detail?.runtime && <p className="flex gap-2">Runtime : <p className="text-cyan-500">{detail?.runtime}min</p></p>}
		</div>
	)
}

export default MoreDetails