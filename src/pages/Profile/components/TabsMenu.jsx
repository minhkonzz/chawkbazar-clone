const Tab = () => {
   return (
      <div className="tab">
         <ion-icon name='person-outline'/>
         <span>Account details</span>
      </div>
   )
}

const TabsMenu = () => {
   return (
      <div>
         <Tab />
         <Tab />
         <Tab />
      </div>
   )
}

export default TabsMenu