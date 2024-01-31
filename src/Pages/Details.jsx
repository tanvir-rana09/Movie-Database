import { useParams } from "react-router-dom"
import { BgImage } from "../Components/Index"
import { fetchDataFromApi } from "../Utils/ApiCall"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { addFavorite } from "../Redux/Favorite"

const Details = () => {
  const { media, id } = useParams()
  const [detail, setDetail] = useState()
  const [loading, setLoading] = useState(true)
  const [favorite, setFavorite] = useState(false)
  const dispatch = useDispatch()
  const onClickHandler = () => {
    setFavorite(true)
    dispatch(addFavorite(detail))
  }
  const { url } = useSelector(state => state.home)
  const [poster, setPoster] = useState()
  useEffect(() => {
    fetchDataFromApi(`/${media}/${id}`).then((res) => {
      setDetail(res)
      setPoster(url + res.poster_path)
      // console.log(res);
      setLoading(false)
    }).catch((error) => console.log(error))
  }, [media, id])
  console.log(detail);
  return (
    <div>
      <div className="relative ">
        <div><BgImage details={`/${media}/${id}`} /></div>
        <div className="absolute left-10 gap-5 top-32 grid grid-cols-3 h-full w-full 2xl:px-[15%]">
          <div className="h-[30rem] w-[20rem] mx-auto">
            <img className="rounded-lg h-full w-full mx-auto col-span-1 object-cover" src={poster} />
          </div>
          <div className=" col-span-2">
            <div className="flex gap-2">
              <p className="text-2xl">{detail?.title ? detail?.title : detail?.name}</p>
              <div className={` p-2 rounded-full text-2xl bg-gray-500/50 `}>
                {favorite ? <div className={`text-red-500`}><MdOutlineFavorite /></div> : <div onClick={onClickHandler}><MdFavoriteBorder /></div>}
              </div>
            </div>
            {detail?.release_date && <p className="text-red-500">Release Date : {detail?.release_date}</p>}
            <div className="flex items-center gap-3">
              <ul className="flex gap-2">
                {detail?.genres.map((name) => (
                  <li key={name.id}>{name.name},</li>
                ))}
              </ul>
              {detail?.runtime && <p>Runtime : {detail?.runtime}min</p>}
            </div>
            {detail?.budget && <div>
              <p>Budget : {detail?.budget || 'Unknown'}</p>
              <p>Revenue : {detail?.revenue || 'Unknown'}</p>
            </div>}
            {detail?.spoken_languages && <div className="flex">
              <p>Spoken Languages : </p>
              <ul className="flex">
                {detail?.spoken_languages.map((name) => (
                  <li className="ml-2" key={name.english_name}>{name.english_name},</li>
                ))}
              </ul>
            </div>}
            <div>
              <p>Tagline</p>
              <p> {detail?.tagline}</p>
            </div>
            <p> Status : {detail?.status}</p>
            {/* <div>
              <p>Overview</p>
              <p>{detail?.overview}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details