import { useSelector } from "react-redux"
import AllDisplay from "../Components/AllDisplay"

const SearchItems = () => {
  const searchData = useSelector(state => state.search.searchItem)
  return (
    <div>
      <AllDisplay classname='hi' forCard='flex-row' category={`/search/multi?query=${searchData}&include_adult=false&language=en-US&page=1`} paths='Search' params={searchData.replace('+', ' ')} />
    </div>
  )
}

export default SearchItems