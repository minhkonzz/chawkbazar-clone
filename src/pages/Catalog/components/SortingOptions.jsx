import { useState } from 'react';

const SortingOptions = () => {

  const [ isHide, setIsHide ] = useState(true)

  return (
    <div className="dropdown-menu-wrapper posrel d-ib">
      <button className="dropdown-btn d-flex jc-sa at-center w-100pc thin-bd-r fw-600" onClick={() => setIsHide(!isHide)}>
        Sorting Options
        <div className="up-down-icons">
          <ion-icon className="d-b" name="chevron-up" />
          <ion-icon className="d-b" name="chevron-down" />
        </div>
      </button> {    
      !isHide && 
      <div className="dropdown-content posab z-1 w-100pc thin-bd-r">
        <p>Newest</p>
        <p>Popularity</p>
        <p>Price: Low to High</p>
        <p>Price: High to Low</p>
      </div> 
      }
    </div>
  )
}

export default SortingOptions; 