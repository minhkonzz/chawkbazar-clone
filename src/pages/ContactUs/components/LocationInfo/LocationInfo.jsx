import './LocationInfo.css'
import Contact from '../Contact/Contact'

const LocationInfo = () => {
  return (
    <div className="location-info">
      <h4>Find us here</h4>
      <Contact />
      <Contact />
      <Contact />
      <img src="https://chawkbazar.vercel.app/assets/images/map-image.jpg"/>
    </div>
  )
}

export default LocationInfo