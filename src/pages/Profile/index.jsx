import './index.css';
import { useState } from "react";
import AccountDetail from "./components/AccountDetail";
import Orders from "./components/Orders";
import PasswordUpdate from "./components/PasswordUpdate";
import { profileTabs } from './static-data';

const Profile = () => {

  const [ selectedIndex, setSelectedIndex ] = useState(0);

  return (
    <div className="profile">
      <div className="profile__tabs"> {
        profileTabs.map((tab, i) => (
          <div key={i} className={`profile__tab${selectedIndex === i ? ' selected' : ''}`} onClick={() => setSelectedIndex(i)}>
            <ion-icon name={tab?.icon} />
            <span className="profile__tab__title">{tab?.title}</span>
          </div>
        )) 
      }
      </div>
      <div className="profile__content"> {
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