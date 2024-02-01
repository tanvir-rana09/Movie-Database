import { useParams } from "react-router-dom"
import { BgImage, Cast, MoreDetails } from "../Components/Index"
import { fetchDataFromApi } from "../Utils/ApiCall"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { addFavorite } from "../Redux/Favorite"
import CircleRating from "../Components/Circle Rating/Circlerating"
import { FaPlay } from "react-icons/fa";
import { GiCrossedBones } from "react-icons/gi";

const Details = () => {
  const { media, id } = useParams()
  const [detail, setDetail] = useState()
  const [loading, setLoading] = useState(true)
  const [favorite, setFavorite] = useState(false)
  const [video, setVideo] = useState(null)
  const [videoshow, setVideoshow] = useState(false)
  const [directors, setDirectors] = useState();
  const [writers, setWriters] = useState();
  const [heroes, setHeroes] = useState();
  const [cast, setCast] = useState();
  const [producer, setProducer] = useState()
  const dispatch = useDispatch()

  const onClickHandler = () => {
    setFavorite(true)
    dispatch(addFavorite(detail))
  }

  const { url } = useSelector(state => state.home)
  const [poster, setPoster] = useState()

  const trailer = () => {
    setVideo('')
    fetchDataFromApi(`/${media}/${id}/videos`).then((video) => {
      console.log(video.results[0].id);
      setVideo(video.results[0].key)
    })
  }

  const videoClick = () => {
    setVideoshow(true)
    trailer()
  }

  useEffect(() => {
    setPoster('')
    fetchDataFromApi(`/${media}/${id}`).then((res) => {
      setDetail(res)
      setPoster(url + res.poster_path)
      setLoading(false)
    }).catch((error) => console.log(error))
  }, [url, id, media])

  useEffect(() => {
    fetchDataFromApi(`/${media}/${id}/credits`).then((res) => {

      res.crew.filter((crewMember) => crewMember.job === 'Director')
        .map((director) => setDirectors(director));

      res.crew.filter((crewMember) => ['Screenplay', 'Writer'].includes(crewMember.job))
        .map((writer) => setWriters(writer));

      res.crew.filter((crewMember) => crewMember.character === 'Hero\'s Character')
        .map((hero) => setHeroes(hero));

      res.crew.filter((crewMember) => crewMember.job === 'Casting')
        .map((cast) => setCast(cast));

      res.crew.filter((crewMember) => crewMember.job === 'Producer')
        .map((cast) => setProducer(cast));

    }).catch(err=> console.log(err))
  }, [media, id])
  return (
    <div>
      <div className="relative ">
        <div><BgImage details={`/${media}/${id}`} /></div>
        <div className="absolute left-0 gap-2 md:gap-5 top-7 grid md:grid-cols-3 grid-cols-1 h-full w-full 2xl:px-[15%] place-content-center items-center px-2">
          <div className="lg:h-[25rem] md:place-self-end place-self-center lg:w-[18rem] md:h-[18rem] md:w-[13rem] h-[15rem] w-[10rem]">
            <img className="rounded-lg h-full w-full col-span-1 object-cover" src={poster} />
          </div>
          <div className=" col-span-2">
            <div className="">
              <div className="flex gap-2">
                <p className="text-xl lg:text-3xl md:text-2xl font-semibold">{detail?.title ? detail?.title : detail?.name}</p>
              </div>
              {detail?.release_date && <p className="text-red-500 text-xs md:text-sm">Release Date : {detail?.release_date}</p>}
            </div>
            <div className="flex gap-2 py-3 items-center">
              <CircleRating rating={detail?.vote_average.toFixed(1)} />
              <div className={`flex items-center justify-center p-2.5 rounded-full text-xl bg-primaryColor`}>
                {favorite ? <div className={`text-red-500`}><MdOutlineFavorite /></div> : <div onClick={onClickHandler}><MdFavoriteBorder /></div>}
              </div>
              <button
                onClick={videoClick}
                className="flex items-center gap-2 ">
                <div className="bg-primaryColor p-3 rounded-full flex justify-center"><FaPlay size={15} color="white" /></div>
                <p className="text-xl">Play Trailer</p>
              </button>
            </div>
            {detail?.tagline && <div className="flex gap-1.5 mb-2">
              <p className="italic text-gray-300"> {detail?.tagline}</p>
            </div>}
            {detail?.overview && <div className="flex gap-1.5 flex-col leading-5">
              <p className="text-xl font-bold tracking-wider">Overiew</p>
              <p className=" text-gray-300 text-xs md:text-sm"> {detail?.overview}</p>
            </div>}

            <div className="flex items-center justify-between mt-2">
              {directors && <div> <p className="text-xs md:text-sm font-semibold">{directors?.original_name}</p> <p className="text-xs">Director</p> </div>}
              {writers && <div> <p className="text-xs md:text-sm font-semibold">{writers?.original_name}</p> <p className="text-xs">Writer</p> </div>}
              {heroes && <div> <p className="text-xs md:text-sm font-semibold">{heroes?.original_name}</p> <p className="text-xs">Character</p> </div>}
              {cast && <div> <p className="text-xs md:text-sm font-semibold">{cast?.original_name}</p> <p className="text-xs">Cast</p> </div>}
              {producer && <div> <p className="text-xs md:text-sm font-semibold">{producer?.original_name}</p> <p className="text-xs">Producer</p> </div>}
            </div>
          </div>
        </div>
        {videoshow && <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center bg-primaryColor/90">
          <div className="relative">
            <button onClick={() => setVideoshow(!videoshow)} className="absolute p-2 right-0 top-0 hover:bg-gray-600/40 duration-300 rounded-full cursor-pointer"><GiCrossedBones size={20} /></button>
            <iframe className='w-full h-full md:w-[50rem] md:h-[30rem]'
              title='Youtube player'
              sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
              src={`https://youtube.com/embed/${video}?autoplay=0`}>
            </iframe>
          </div>
        </div>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className=" col-span-2"><Cast media={media} id={id} /></div>
        <div><MoreDetails media={media} id={id} /></div>
      </div>
    </div>
  )
}

export default Details