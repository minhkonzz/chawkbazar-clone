import './index.css';
import { useState } from "react";
import AccountDetail from "./components/AccountDetail";
import Orders from "./components/Orders";
import PasswordUpdate from "./components/PasswordUpdate";
import { profileTabs } from './static-data';

const Profile = () => {

  const [ selectedIndex, setSelectedIndex ] = useState(0);

  return (
    <div className="profile row">
      <div className="col lg-3 lg-offset-1 md-4 sm-12 mb-36px"> {
        profileTabs.map((tab, index) => (
          <div key={index} className={`tab thin-bd-r${selectedIndex === index ? ' selected' : ''}`} onClick={() => setSelectedIndex(index)}>
            <ion-icon name={tab?.icon}/>
            <span>{tab?.title}</span>
          </div>
        )) 
      }
      </div>
      <div className="col lg-7 md-8 sm-12 mb-36px"> {
        (selectedIndex === 0 && <></>) ||
        (selectedIndex === 1 && <Orders />) ||
        (selectedIndex === 2 && <AccountDetail />) || 
        (selectedIndex === 3 && <PasswordUpdate />) || 
        (selectedIndex === 4 && <></>)
      }
      </div>
    </div>
  )
}

export default Profile;