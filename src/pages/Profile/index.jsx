import './index.css';
import TabsMenu from './components/TabsMenu';
import { Outlet } from 'react-router-dom';

const Profile = () => (
  <div className="profile row">
    <div className="col lg-3 lg-offset-1 md-4 sm-12"> 
      <TabsMenu />
    </div>
    <div className="col lg-7 md-8 sm-12">
      <Outlet />
    </div>
  </div>
)

export default Profile;