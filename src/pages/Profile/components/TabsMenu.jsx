import { useState } from 'react'
import { useNavigate } from "react-router-dom"

const profileTabs = [
   {
      icon: 'home-outline', 
      title: 'Dashboard',
      path: ''
   },
   {
      icon: 'cart-outline', 
      title: 'Orders',
      path: 'orders'
   },
   {
      icon: 'person-outline', 
      title: 'Account Details',
      path: 'account-details'
   },
   {
      icon: 'settings-outline', 
      title: 'Change Password',
      path: 'change-password'
   },
   {
      icon: 'log-out-outline', 
      title: 'Logout',
      path: ''
   }
]

const TabsMenu = () => {

   const navigate = useNavigate()
   const [ selectedIndex, setSelectedIndex ] = useState(0)

   return (
      <> { 
         profileTabs.map((tab, index) => (
            <div key={index} className={`tab thin-bd-r${selectedIndex === index ? ' selected' : ''}`} onClick={() => {
               setSelectedIndex(index)
               navigate(tab?.path) 
            }}>
               <ion-icon name={tab?.icon}/>
               <span>{tab?.title}</span>
            </div>
         )) 
      } 
      </>
   )
}

export default TabsMenu