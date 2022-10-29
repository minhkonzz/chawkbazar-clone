import Filter from "./Filter"
import { useState, useEffect } from 'react'
import { fetchAll as getFiltersData } from '../../../utils/fetch'

const selects = ["T-shirt", "Coat"]; 

const urls = [
   'https://630fa0ec498924524a92aac4.mockapi.io/categories',
   'https://62f3d1c5a84d8c96812d1ccc.mockapi.io/topbrands'
]

const Filters = () => {

   const [ filterSections, setFilterSections ] = useState(![])

   useEffect(() => {
      getFiltersData(urls)
      .then(responseDatas => setFilterSections([
         {
            title: 'Category', 
            urlParam: 'category',
            filtersList: responseDatas[0]
         }, 
         {
            title: 'Brands', 
            urlParam: 'brand',
            filtersList: responseDatas[1]
         }, 
         {
            title: 'Prices', 
            urlParam: 'price',
            filtersList: [
               { min: undefined, max: 50 }, 
               { min: 50, max: 100 }, 
               { min: 100, max: 150 },
               { min: 150, max: 200 },
               { min: 200, max: 300 }, 
               { min: 300, max: 500 }, 
               { min: 500, max: 1000 }, 
               { min: 1000, max: undefined }
            ]
         }, 
      ]))
      .catch(err => console.error(err))
   }, [])

   return (
      <div className="filters">
         <div className="filters-header">
            <p>Home / Search</p>
            <div className="d-flex jc-sb at-center">
               <h2>Filters</h2>
               <span className="blur">Clear all</span>
            </div>
            <div className="checkbox-selected d-flex wrap"> {
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
         {
            filterSections && 
            filterSections.map((filterSection, index) => <Filter key={index} data={filterSection}/>)
         }
      </div>
   )
}

export default Filters 