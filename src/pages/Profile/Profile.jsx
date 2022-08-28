import './Profile.css'
import Order from './components/Order'
import TabsMenu from './components/TabsMenu'

const Profile = () => (
   <div className="profile-detail row">
      <div className="col lg-3 lg-offset-2 md-4 sm-12"> 
         <TabsMenu />
      </div>
      <div className="col lg-5 md-8 sm-12">
         <Order />
      </div>
   </div>
)

export default Profile