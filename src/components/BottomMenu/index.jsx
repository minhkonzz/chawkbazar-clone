import './index.css';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { touchMenuSidebar, touchCartSidebar } from 'services/redux/store/reducers/popup.reducer';

const BottomMenu = () => {

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const tabs = [
  //   {
  //     tabIcon: 'home-outline', 
  //     onTabClick: () => { navigate('/') } 
  //   },
  //   {
  //     tabIcon: 'search-outline', 
  //     onTabClick: () => {} 
  //   },
  //   {
  //     tabIcon: 'bag-handle-outline', 
  //     onTabClick: () => { dispatch(touchCartSidebar()) }
  //   }
  // ];

  // const onClick = () => {
  //   dispatch(touchMenuSidebar());
  // }

  return (
    <div className="bottom__menu">
      <button className="bottom__menu__nav-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 25.567 18">
          <g transform="translate(-776 -462)">
            <rect id="Rectangle_941" data-name="Rectangle 941" width="12.749" height="2.499" rx="1.25" transform="translate(776 462)" fill="currentColor"></rect>
            <rect id="Rectangle_942" data-name="Rectangle 942" width="25.567" height="2.499" rx="1.25" transform="translate(776 469.75)" fill="currentColor"></rect>
            <rect id="Rectangle_943" data-name="Rectangle 943" width="17.972" height="2.499" rx="1.25" transform="translate(776 477.501)" fill="currentColor"></rect>
          </g>
        </svg>
      </button>
    {/* { tabs.map((tab, i) => 
        <button
          className="bottom__menu__tab" 
          key={i} 
          onClick={tab.onTabClick}>
          <ion-icon name={tab.tabIcon} />
        </button>
      ) } */}
    </div>
  )
}

export default BottomMenu;