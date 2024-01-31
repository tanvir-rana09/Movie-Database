import {Header, Trending,Popular, Toprated,Upcoming} from "../Components/Index"


const Home = () => {
  return (
	<div>
		<Header/>
		<Upcoming/>
		<Trending/>
		<Popular/>
		<Toprated/>
	</div>
  )
}

export default Home