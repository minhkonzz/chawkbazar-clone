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
    <div className="catalog__filters-sidebar" ref={filtersSidebarRef}>
      <div className="catalog__filters-sidebar-top">
        <button className="catalog__filters-sidebar-top__close-button">
          <ion-icon name="arrow-back" onClick={closeFiltersSidebar} />
        </button>
        <span className="catalog__filters-sidebar-top__title">Filters</span>
      </div>
      <div className="catalog__filters-sidebar-center"><Filters /></div>
      <div className="filters-sidebar-bottom posrel">
        <span className="posab pos-center color-white">9,068 items</span>
      </div>
    </div>
  )
};

export default FiltersSidebar;