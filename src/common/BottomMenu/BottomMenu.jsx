import './BottomMenu.css'

const tabs = [
   'menu-outline', 
   'search-outline', 
   'home-outline', 
   'bag-handle-outline', 
   'person-outline'
]

const BottomMenu = () => {
   return (
      <div className="bottom-menu w-full shadow-top jc-sb at-center">
      {
         tabs.map((tab, index) => {
            return (
               <button key={index}><ion-icon name={tab} /></button>
            )
         })
      }
      </div>
   )
}

export default BottomMenu