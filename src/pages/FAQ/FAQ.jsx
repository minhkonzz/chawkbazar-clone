import './FAQ.css'
import { useState } from 'react'
import HeaderBackground from '../../common/HeaderBackground/HeaderBackground'
import UserMailGetter from "../../common/UserMailGetter/UserMailGetter"
import Footer from "../../common/Footer/Footer"

const AQBox = () => {

   const [ openAnswer, setOpenAnswer ] = useState(false)

   console.log('render AQBox')
   return (
      <>
         <div className="question">
            <p><b>How to contact with customer service</b></p>
            <button className={`${openAnswer && 'opening'}`} onClick={() => setOpenAnswer(!openAnswer)}>
               <ion-icon name="add" />
            </button>
         </div>
         <div className={`answer ${openAnswer && 'active'}`}>
            <p className={`${openAnswer && 'visible'}`}>Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!.</p>
         </div>
      </>
   )
}

const FAQ = () => {

   console.log('render FAQ')

   return (
      <>
         <header>
            <HeaderBackground />
         </header>
         <div className="grid wide">
            <main>
               <div className="faq-detail row">
                  <div className="col lg-8 lg-offset-2 md-12 sm-12">
                     <div className="q-a w-100pc">
                        <AQBox />
                     </div>
                     <div className="q-a w-100pc">
                        <AQBox />
                     </div>
                     <div className="q-a w-100pc">
                        <AQBox />
                     </div>
                  </div>
               </div>
               <UserMailGetter />
            </main>
            <Footer />
         </div>
      </>
   )
}

export default FAQ
