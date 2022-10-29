import Contact from "../Contact"

const LocationInfo = () => {
  return (
    <div className="location-info thin-bd-r">
      <h4>Find us here</h4>
      <Contact />
      <Contact />
      <Contact />
      <img className="thin-bd-r w-100pc" src="https://chawkbazar.vercel.app/assets/images/map-image.jpg"/>
    </div>
  )
}

export default LocationInfo