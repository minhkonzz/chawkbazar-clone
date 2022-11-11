import { useElementSize } from "usehooks-ts";

const NewCollection = ({ collection }) => {

   const [ collectionRef, { width, height }] = useElementSize();

   return (
      <div className="col lg-4 md-6 sm-12" ref={collectionRef}>
         <div className="new-collection">
            <div className="collection-img posrel o-h">
               <img src={collection?.image} className="w-100pc"/>
               <button className="view-collection-btn posab bottom-m10pc right-3pc light-v thin-bd-r ex-blur" style={{ fontSize: 0.025 * width }}>
                  View Collection
               </button>
            </div>
            <div className="new-collection-detail" style={{ padding: `0 ${ 0.12 * width }px` }}>
               <h1 style={{ fontSize: 0.05 * width }}>{collection?.title}</h1>
               <p style={{ fontSize: 0.028 * width, marginTop: 0.025 * height }}>{collection?.desc}</p>
            </div>
         </div>
      </div>
   )
}

export default NewCollection;