import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Details, Footer, Home, Movies, Navbar, SearchItems, TVshows,Favorite } from "./Components/Index"
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details/:media/:id" element={<Details />} />
        <Route path="search/:query" element={<SearchItems />} />
        <Route path="movies/:category" element={<Movies />} />
        <Route path="tv/:category" element={<TVshows />} />
        <Route path="favorite" element={<Favorite/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
