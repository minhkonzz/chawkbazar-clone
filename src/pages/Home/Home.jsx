import './Home.css'
import Navbar from '../../common/Navbar/Navbar'
import Slider from './components/Banner/Slider'
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts'
import NewCollections from './components/NewCollections/NewCollections'
import Contact from './components/Contact/Contact'
import UserMailGetter from '../../common/UserMailGetter/UserMailGetter'
import Footer from '../../common/Footer/Footer'

const Home = () => (
  <>
    <header>
      <Navbar />
    </header>
    <div className="grid wide" style={{ paddingTop: 100 }}>
      <main>
        <Slider />
        <FeaturedProducts />
        <NewCollections />
        <Contact />
        <UserMailGetter />
      </main>
      <Footer />
    </div>
  </>
)

// hey 

export default Home