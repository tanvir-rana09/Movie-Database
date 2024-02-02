import AllDisplay from "../Components/AllDisplay"
import { useParams } from "react-router-dom"

const SearchItems = () => {
  const {query} = useParams()
  return (
    <div>
      <AllDisplay classname='hi' forCard='flex-row' category={`/search/multi?query=${query}&include_adult=false&language=en-US&page=1`} paths='Search' params={query.replace('+', ' ')} overview={true} />
    </div>
  )
}

export default SearchItems