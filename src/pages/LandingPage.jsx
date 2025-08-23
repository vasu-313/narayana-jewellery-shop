
import CategoriesNavBar from '../components/CategoriesNavbar'
import Navbar from '../components/Navbar'
import BottomNavbar from '../components/BottomNavbar'
import ProductsPage from './ProductsPage'
import { SearchProvider } from '../context/SearchContext'

const LandingPage = () => {
  return (
    <>
      <SearchProvider>
        <Navbar />
        <CategoriesNavBar />
        <ProductsPage />
        <BottomNavbar />
      </SearchProvider>
    </>
  )
}

export default LandingPage