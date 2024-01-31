import { useParams } from 'react-router-dom'
import { AllDisplay, BgImage } from '../Components/Index'

const TVshows = () => {
  const { category } = useParams()
  return (
	<div>
    <AllDisplay category={`/tv/${category}`} title='tv shows' params={category} paths='TV' media='tv'/>
  </div>
  )
}

export default TVshows