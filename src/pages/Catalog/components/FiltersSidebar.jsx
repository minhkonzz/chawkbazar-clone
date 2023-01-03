import { useRef } from "react";
import { useDispatch } from "react-redux";
import { touchFiltersSidebar } from "services/redux/store/reducers/popup.reducer";
import Filters from "./Filters";

const FiltersSidebar = () => {

  const dispatch = useDispatch();
  const filtersSidebarRef = useRef(null);

  const closeFiltersSidebar = () => {
    filtersSidebarRef.current.style.left = "-100%";
    setTimeout(() => { dispatch(touchFiltersSidebar()); }, 500);
  }

  return (
    <div className="filters-sidebar" ref={filtersSidebarRef}>
      <div className="filters-sidebar-top posrel">
        <span className="posab top-50pc left-6pc">
          <ion-icon name="arrow-back" onClick={closeFiltersSidebar} />
        </span>
        <h2 className="posab pos-center">Filters</h2>
      </div>
      <div className="filters-sidebar-center"><Filters /></div>
      <div className="filters-sidebar-bottom posrel">
        <span className="posab pos-center color-white">9,068 items</span>
      </div>
    </div>
  )
};

export default FiltersSidebar;