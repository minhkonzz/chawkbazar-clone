import './BottomMenu.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { touchMenuSidebar, touchCartSidebar } from '../../store/Reducers/popup'

const BottomMenu = () => {

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const tabs = [
      {
         tabIcon: 'menu-outline', 
         onTabClick: () => { dispatch(touchMenuSidebar()) } 
      },
      {
         tabIcon: 'home-outline', 
         onTabClick: () => { navigate('/') } 
      },
      {
         tabIcon: 'search-outline', 
         onTabClick: () => {} 
      },
      {
         tabIcon: 'bag-handle-outline', 
         onTabClick: () => { dispatch(touchCartSidebar()) }
      }
   ]

   return (
      <div className="bottom-menu w-full shadow-top jc-sb at-center"> {
         tabs.map((tab, index) => {
            return (
               <button 
                  key={index} 
                  onClick={tab.onTabClick}>
                  <ion-icon name={tab.tabIcon} />
               </button>
            )
         })
      }
      </div>
   )
}

export default BottomMenu