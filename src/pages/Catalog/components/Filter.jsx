// import Checkbox from "common/components/Checkbox";
// import { useDispatch } from "react-redux";
// import { getFilteredProducts } from "services/redux/store/reducers/catalog.slice";

// const Filter = (props) => {

//   const { data, currentProducts, filter } = props;
//   const dispatch = useDispatch();

//   const modifySelection = (event, val) => {
//     const newFilter = {...filter};
//     const optionsTitle = data.urlParam; 
//     if (event.target.checked) {
//       const newOption = {
//         optionId: val.optionId, 
//         optionName: val.optionName
//       }
//       newFilter[optionsTitle] = newFilter[optionsTitle] ? [...newFilter[optionsTitle], newOption ] : [ newOption ];
//     }
//     else {
//       if (newFilter[optionsTitle].length === 1) delete newFilter[optionsTitle];
//       else newFilter[optionsTitle] = newFilter[optionsTitle].filter((selectedOptId) => selectedOptId !== val.optionId);
//     }
//     dispatch(getFilteredProducts({
//       newFilter,
//       currentProductsLength: currentProducts.length
//     }));
//   }

//   return (
//     <div className="catalog__filter">
//       <span className="catalog__filter__title">{data.title}</span>
//       <div className="catalog__filter__options"> {
//         data.filtersList.map((option, i) => {
//           return (
//             <Checkbox
//               isChecked={!!filter[data.urlParam] && filter[data.urlParam].map((option) => option.optionName).includes(option.name)}
//               onSelectChange={() => modifySelection}
//               key={i}
//               cbVal={
//                 { optionId: option.id, optionSlug: option.slug, optionName: option.name || 
//                  (option.min && !option.max 
//                   ? `${option.min}-` :
//                   option.max && !option.min
//                   ? `-${option.max}` : `${option.min}-${option.max}`) } 
//               }>
//               { option.name || 
//                (option.min && !option.max 
//                 ? `Over $${option.min}` :
//                 option.max && !option.min 
//                 ? `Under $${option.max}` : `$${option.min} - $${option.max}`)
//               }
//             </Checkbox>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default Filter; 