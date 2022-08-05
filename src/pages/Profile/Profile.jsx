import './Profile.css'
import HeaderBackground from "../../common/HeaderBackground/HeaderBackground"
import UserMailGetter from "../../common/UserMailGetter/UserMailGetter"
import Footer from "../../common/Footer/Footer"
import Order from './components/Order'
import TabsMenu from './components/TabsMenu'

const Profile = () => (
   <>
      <header>
         <HeaderBackground />
      </header>
      <div className="grid wide">
         <main>
            <div className="profile-detail row">
               <div className="col lg-3 lg-offset-2 md-4 sm-12"> 
                  <TabsMenu />
               </div>
               <div className="col lg-5 md-8 sm-12">
                  <Order />
               </div>
            </div>
            <UserMailGetter />
         </main>
         <Footer />
      </div>
   </>
)

export default Profile