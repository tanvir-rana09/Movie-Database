import { NavLink } from "react-router-dom";
import Logo from "./Logo"
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineFavorite } from "react-icons/md";
import { useState } from "react";
import { GiCrossedBones } from "react-icons/gi";
import { useSelector } from "react-redux";

const Navbar = () => {
	const [nav, setNav] = useState(false)
	const [navActive, setNavActive] = useState(false)
	const favorite = useSelector((state) => state.favorite.favorite)

	window.addEventListener('scroll', () => {
		if (window.scrollY > 200) {
			setNavActive(true)
		} else { setNavActive(false) }
	})


	return (

		<div className={`duration-500 ${navActive ? 'fixed top-0 z-10 w-full bg-primaryColor' : '-top-10 bg-transparent'}`}>
			<nav className={` flex items-center justify-between px-10 absolute z-10 w-full 2xl:px-[15%] duration-500 bg-primaryColor py-2 ${navActive ? '' : 'bg-transparent'}`}>
				<NavLink to='/' className="cursor-pointer"><Logo /></NavLink>
				<button
					onClick={() => setNav(!nav)}
					className="text-white text-2xl cursor-pointer p-2 z-[155] hover:bg-slate-100/20 duration-300 rounded-full md:hidden ">
					{nav ? <GiCrossedBones /> : <HiMiniBars3BottomRight size={30} />}
				</button>
				<ul className={`text-white tracking-wide md:items-center md:flex duration-500 ${nav ? 'top-0 left-0 flex md:hidden flex-col w-9/12 opacity-100 bg-primaryColor h-screen z-[90] fixed' : 'hidden md:block'}`}>
					<li className="md:py-2 py-3 pl-6 px-5 hover:bg-gray-500/30 cursor-pointer border-b-2 border-gray-400/20 md:border-none linear">
						<NavLink to='/' className={({isActive})=>isActive?'linear2':'linear'}>Home</NavLink>
					</li>
					<li className="dropdown relative z-[99] rounded-none md:rounded-full border-b-2 md:border-none border-gray-400/20">
						<div className="flex hover:bg-gray-500/30 items-center gap-1 cursor-pointer rotate md:py-2 py-3 pl-6 px-5 justify-between font-extendfont7">
							<NavLink>Movies</NavLink>
							<div className="rotate-180 duration-300 rotateBy"><RiArrowDownSLine /></div>
						</div>
						<div className="dropdown-items hidden md:absolute md:left-0 md:top-10 md:w-[9rem] ">
							<ul className="flex justify-between flex-col gap-2 md:gap-0 h-full w-full  bg-[#03213A] text-white md:bg-white md:text-black rounded-md md:py-2 pl-10 md:pl-0">
								<li>
									<NavLink to='movies/popular'  className={({isActive})=>isActive?'linear2':'linear'}>Popular</NavLink>
								</li>
								<li>
									<NavLink to='movies/upcoming'  className={({isActive})=>isActive?'linear2':'linear'}>Upcoming</NavLink>
								</li>
								<li>
									<NavLink to='movies/top_rated'  className={({isActive})=>isActive?'linear2':'linear'}>Top Rated</NavLink>
								</li>
							</ul>
						</div>
					</li>
					<li className="dropdown relative z-[70] rounded-none md:rounded-full border-b-2 border-gray-400/20 md:border-none">
						<div className="flex items-center gap-1 cursor-pointer rotate md:py-2 py-3 pl-6 px-5 justify-between hover:bg-gray-500/30 font-extendfont7">
							<NavLink  >TV Shows</NavLink>
							<div className="rotate-180 duration-300 rotateBy"><RiArrowDownSLine /></div>
						</div>
						<div className="dropdown-items hidden md:absolute md:left-0 md:top-10 md:w-[9rem] ">
							<ul className="flex justify-between flex-col h-full w-full bg-[#03213A] text-white md:bg-white md:text-black md:py-2 rounded-md pl-10 md:pl-0">
								<li>
									<NavLink to='tv/popular'  className={({isActive})=>isActive?'linear2':'linear'}>Popular</NavLink>
								</li>
								<li>
									<NavLink to='tv/airing_today'  className={({isActive})=>isActive?'linear2':'linear'}>Airing Today</NavLink>
								</li>
								<li>
									<NavLink to='tv/top_rated'  className={({isActive})=>isActive?'linear2':'linear'}>Top Rated</NavLink>
								</li>
							</ul>
						</div>
					</li>
					<li className={`flex items-center gap-1 md:py-2 py-3 pl-6 px-5 hover:bg-gray-500/30 cursor-pointer border-b-2 border-gray-400/20 md:border-none `}>
						<NavLink to='favorite' className={({isActive})=>isActive?'linear2':'linear'}>Favorites</NavLink>
						<MdOutlineFavorite size={20} color="red" />
						<p className="text-red-500">{favorite.length }</p>
					</li>
				</ul>
			</nav>
		</div>

	)
}

export default Navbar
