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
        <div className="absolute left-10 gap-2 md:gap-5 top-5 grid md:grid-cols-3 h-full w-full 2xl:px-[15%] place-content-center items-center">
          <div className="lg:h-[30rem] lg:w-[20rem] h-[20rem] mx-auto">
            <img className="rounded-lg h-full w-full mx-auto col-span-1 object-cover" src={poster} />
          </div>
          <div className=" col-span-2">
            <div className="md:mb-5">
              <div className="flex gap-2">
                <p className="text-2xl md:text-3xl text-cyan-500 font-semibold">{detail?.title ? detail?.title : detail?.name}</p>
                <div className={` p-1 flex items-center justify-center px-2 rounded-full text-xl bg-gray-500/50 `}>
                  {favorite ? <div className={`text-red-500`}><MdOutlineFavorite /></div> : <div onClick={onClickHandler}><MdFavoriteBorder /></div>}
                </div>
              </div>
              {detail?.release_date && <p className="text-red-500">Release Date : {detail?.release_date}</p>}
            </div>
            <div className="flex items-center gap-3">
              <ul className="flex gap-2">
                Genras :
                {detail?.genres.map((name) => (
                  <li className="text-cyan-500 " key={name.id}>{name.name},</li>
                ))}
              </ul>
              {detail?.runtime && <p className="flex gap-2">Runtime : <p className="text-cyan-500 font-semibold">{detail?.runtime}min</p></p>}
            </div>
            {detail?.budget && <div>
              <p className="flex gap-1.5">Budget : <p className="text-cyan-400">{(detail?.budget > 0 ? detail?.budget : "Unknown") || detail?.budget || 'Unknown'}</p></p>
              <p className="flex gap-1.5">Revenue : <p className="text-cyan-400">{(detail?.revenue > 0 ? detail?.revenue : "Unknown") || detail?.revenue || 'Unknown'}</p></p>
            </div>}
            {detail?.spoken_languages && <div className="flex">
              <p>Spoken Languages : </p>
              <ul className="flex">
                {detail?.spoken_languages.map((name) => (
                  <li className="ml-2 text-cyan-500" key={name.english_name}>{name.english_name},</li>
                ))}
              </ul>
            </div>}
            {detail?.tagline && <div className="flex gap-1.5">
              <p>Tagline :</p>
              <p> {detail?.tagline}</p>
            </div>}
            <p className="flex"> Status : <p className="text-green-500 ml-2"> {detail?.status} </p> </p>
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