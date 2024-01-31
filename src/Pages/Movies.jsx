import { useParams } from "react-router-dom"
import {AllDisplay} from "../Components/Index"

const Movies = () => {
  const { category } = useParams()
  return (
    <div>
      <AllDisplay category={`/movie/${category}`} title='movies' params={category} paths='Movie' media='movie'/>
    </div>
  )
}

export default Movies