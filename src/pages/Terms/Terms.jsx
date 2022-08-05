import './Terms.css'
import { useEffect, useRef } from 'react'
import HeaderBackground from "../../common/HeaderBackground/HeaderBackground"
import UserMailGetter from "../../common/UserMailGetter/UserMailGetter"
import Footer from "../../common/Footer/Footer"

const terms = [
   {
      title: 'Purpose', 
      desc: 'This Privacy Policy describes our policies and procedures on the collection, holding, use and disclosure of your personal information and should be read together with our Terms and Conditions. By providing your personal information you consent to our collection, use and disclosure of that information in accordance with this Privacy Policy.'
   },
   {
      title: 'What is Personal Data?', 
      desc: 'This Privacy Policy describes our policies and procedures on the collection, holding, use and disclosure of your personal information and should be read together with our Terms and Conditions. By providing your personal information you consent to our collection, use and disclosure of that information in accordance with this Privacy Policy.'
   },
   {
      title: 'Personal Data Collected', 
      desc: 'This Privacy Policy describes our policies and procedures on the collection, holding, use and disclosure of your personal information and should be read together with our Terms and Conditions. By providing your personal information you consent to our collection, use and disclosure of that information in accordance with this Privacy Policy.'
   },
   {
      title: 'Accessing your Personal Data', 
      desc: 'This Privacy Policy describes our policies and procedures on the collection, holding, use and disclosure of your personal information and should be read together with our Terms and Conditions. By providing your personal information you consent to our collection, use and disclosure of that information in accordance with this Privacy Policy.'
   },
   {
      title: 'Complaints', 
      desc: 'This Privacy Policy describes our policies and procedures on the collection, holding, use and disclosure of your personal information and should be read together with our Terms and Conditions. By providing your personal information you consent to our collection, use and disclosure of that information in accordance with this Privacy Policy.'
   },
   {
      title: 'Owner and Data Controller', 
      desc: 'This Privacy Policy describes our policies and procedures on the collection, holding, use and disclosure of your personal information and should be read together with our Terms and Conditions. By providing your personal information you consent to our collection, use and disclosure of that information in accordance with this Privacy Policy.'
   }
]

const Terms = () => {

   const refs = useRef([])

   const scrollToTerm = (index) => window.scrollTo(0, refs.current[index].offsetTop)

   return (
      <>
         <header>
            <HeaderBackground />
         </header>
         <div className="grid wide">
            <main>
               <div className="terms-detail row">
                  <div className="col lg-3 lg-offset-1 md-3 sm-12">
                     <div>
                        {
                           terms.map((term, index) => <p onClick={() => scrollToTerm(index)} style={{ marginBottom: 20 }} key={index}>{term.title}</p>)
                        }
                     </div>
                  </div>
                  <div className="col lg-7 md-9 sm-12">
                     <div>
                        {
                           terms.map((term, index) => {
                              return (
                                 <div ref={element => refs.current[index] = element} key={index} className="term">
                                    <h2>{term.title}</h2><br />
                                    <p>{term.desc}</p>
                                 </div>
                              )
                           })
                        }
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

export default Terms