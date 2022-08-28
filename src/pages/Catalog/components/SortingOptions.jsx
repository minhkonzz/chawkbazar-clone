import { useState } from 'react'

const SortingOptions = () => {

   const [ isHide, setIsHide ] = useState(true)

   return (
      <div className="dropdown-menu-wrapper">
         <button className="dropdown-btn w-100pc" onClick={() => setIsHide(!isHide)}>
            Sorting Options
            <div className="up-down-icons">
               <ion-icon name="chevron-up" />
               <ion-icon name="chevron-down" />
            </div>
         </button>
         { !isHide && <div className="dropdown-content w-100pc"></div> }
      </div>
   )
}

export default SortingOptions 