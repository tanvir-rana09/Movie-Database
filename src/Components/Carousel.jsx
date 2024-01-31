import { Card } from './Index';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { useEffect, useState } from 'react';

const Carousel = ({ data,media }) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const calculateSlidesToShow = (width) => {
		if (width > 1200) {
			return 5; // Number of slides to show on large screens
		} else if (width > 992) {
			return 4; // Number of slides to show on medium-sized screens
		} else if (width > 768) {
			return 3; // Number of slides to show on smaller medium-sized screens
		} else {
			return 2; // Number of slides to show on small screens
		}
	};

	var settings = {
		infinite: true,
		slidesToShow: calculateSlidesToShow(windowWidth),
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		slidecount: false,
		prevArrow:<MdArrowBackIosNew/>,
		nextArrow:<MdArrowForwardIos/>

	};
	return (
		<div className='overflow-hidden 2xl:px-[15%] '>
			<Slider  {...settings} >
				{
					data?.map((item) => (
						<div key={item.id} className='w-full h-full'>
							<Card item={item} media={media}/>
						</div>
					))
				}
			</Slider>
		</div>
	)
}

export default Carousel