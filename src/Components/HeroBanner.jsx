import { useForm } from "react-hook-form";
import { BgImage, Button, Input } from "./Index";
import { useDispatch } from "react-redux";
import { setSearchItem } from "../Redux/searchSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";

const HeroBanner = () => {
	const { handleSubmit, control } = useForm()
	const dispatch = useDispatch()
	const [searchControl, setSearchControl] = useState(false)
	const navigate = useNavigate()
	
	const searchFunc = (data) => {
		if (data.search === undefined) {
			setSearchControl(true)
		} else {
			const newData = data.search.replace(' ', '+')
			dispatch(setSearchItem(newData))
			navigate(`search/${newData}`)
			setSearchControl(false)
		}
	}
	return (
		<div className="relative bg-primaryColor/80 h-[40rem] w-full 2xl:px-[15%] ">
			<div className="flex flex-col justify-center h-full sm:px-5 px-2">
				<h2 className="text-5xl font-semibold text-white ">Welcome,</h2>
				<p className="text-white text-xl py-3 tracking-wider">Millions of movies, TV shows and people to discover. Explore now.</p>
				{searchControl && <p className="text-center text-red-600">Please! Search A Movie or TV Show</p>}
				<form
					onSubmit={handleSubmit(searchFunc)}
					className="flex bg-white rounded-full overflow-hidden mt-5">
					<Input
						control={control}
						placeholder="Search for a movie or tv show"
						className="bg-transparent text-black"
					/>
					<Button
						type="submit"
						className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold m-0.5"
						text="Search"
					/>
				</form>
			</div>
			<div className="absolute inset-0 -z-10 h-[40rem] w-full ">
				<BgImage category='/movie/upcoming' />
			</div>
		</div>
	)
}

export default HeroBanner