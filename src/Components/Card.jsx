import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { useEffect, useState } from "react";
import { addFavorite, removeFromFavorite } from "../Redux/Favorite";
import { MdDelete } from "react-icons/md";
import cardImg2 from '../assets/pexels-cottonbro-studio-2773498.jpg'
import CircleRating from "./Circle Rating/Circlerating";

const Card = ({ item, className = '', deleteItem = null, media,overview=false }) => {

	const [favorite, setFavorite] = useState(false)
	const { url } = useSelector((state) => state.home)
	const dispatch = useDispatch()
	const love = useSelector(state => state.favorite.favorite)

	useEffect(() => {
		checkFav()
	}, [])

	const checkFav = () => {
		love.filter((data) => data.id === item.id ? setFavorite(true) : setFavorite(false))
	}

	const onClickHandler = () => {
		setFavorite(true)
		dispatch(addFavorite(item))
	}
	console.log(item.poster_path);
	return (
		<div className="relative ">
			<Link to={`/details/${media}/${item.id}`} >
				<div className={`sm:h-[32rem] ${overview?'sm:h-[32rem]':'sm:h-[27rem]'} h-[25rem] flex-col flex shadow-lg rounded-md w-ful gap-1 overflow-hidden mb-5 hover:scale-[1.01] duration-300 mt-5`} >
					<div className=" w-full sm:h-[23rem] h-[20rem]">
						<img
							className=" w-full h-full object-cover"
							src={(item.poster_path === null || item.poster_path === undefined) ? cardImg2 : url + item.poster_path} alt={item.original_title ? item.original_title : item.original_name} title={item.original_title ? item.original_title : item.original_name} />
					</div>
					<div className="px-2">
						<h1 className="font-semibold tracking-wide hover:text-sky-500">{item.original_title ? item.original_title : item.original_name}</h1>
						<h2 className="text-xs text-slate-500">{item.release_date ? item.release_date : item.first_air_date}</h2>
					</div>
					{overview&& <div className="hidden md:block">{item?.overview}</div>}
				</div>
			</Link>
			<div
				title="Add To Favorite"
				className={`absolute top-0 left-0 p-2 rounded-full text-2xl bg-gray-500/50 hover:cursor-pointer`}>
				{favorite ? <div className={`text-red-500 ${className}`}><MdOutlineFavorite /></div> : <div onClick={onClickHandler} className={className}><MdFavoriteBorder /></div>}
				{deleteItem ? <div onClick={() => dispatch(removeFromFavorite(item.id))}><MdDelete color="hotpink" title="remove" /></div> : null}
			</div>
			{item.vote_average && <div className={`absolute top-0 right-0 rounded-full text-white`}>
				<CircleRating rating={item.vote_average.toFixed(1)} />
			</div>}
		</div>
	)
}

export default Card