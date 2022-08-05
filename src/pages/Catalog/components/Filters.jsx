import Filter from "./Filter"

const selects = [
   'T-Shirt', 
   'Kids', 
   'T-Shirt'
]

const Filters = () => {
   return (
      <div className="filters">
         <div className="filters-header">
            <p>Home / Search</p>
            <div className="d-flex jc-sb at-center">
               <h2>Filters</h2>
               <span className="blur">Clear all</span>
            </div>
            <div className="checkbox-selected d-flex wrap">
               {
                  selects.map((select, index) => {
                     return (
                        <button key={index} className="selected-category thin-bd-r">
                           {select}
                           <ion-icon name="close" />
                        </button>
                     )
                  })
               }
            </div>
         </div>
         <Filter />
         <Filter />
         <Filter />
      </div>
   )
}

export default Filters 