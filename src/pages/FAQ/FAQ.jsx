import './FAQ.css'
import { useState } from 'react'

const AQBox = (props) => {

   const [ openAnswer, setOpenAnswer ] = useState(false)

   console.log('render AQBox')
   return (
      <>
         <div className="question posrel">
            <p className="left-3pc"><b>{props.data.question}</b></p>
            <button className={`${openAnswer && 'opening'}`} onClick={() => setOpenAnswer(!openAnswer)}>
               <ion-icon name="add" />
            </button>
         </div>
         <div className={`answer ${openAnswer && 'active'}`}>
            <p className={`${openAnswer && 'visible '}blur`}>{props.data.answer}</p>
         </div>
      </>
   )
}

const data = [
   {
      question: 'How to contact with Customer Service?',
      answer: 'Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!.'
   },
   {
      question: 'App installation failed, how to update system information?',
      answer: 'Please read the documentation carefully . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum'
   },
   {
      question: 'Website response taking time, how to improve?', 
      answer: 'At first, Please check your internet connection . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum.'
   },
   {
      question: 'How do I create an account?', 
      answer: 'If you want to open an account for personal use you can do it over the phone or online. Opening an account online should only take a few minutes.'
   }
]

const FAQ = () => {
   return (
      <div className="faq-detail row">
         <div className="col lg-8 lg-offset-2 md-12 sm-12">
         { data.map((d, index) => <div key={index} className="q-a thin-bd-r w-100pc"><AQBox data={d}/></div>) }
         </div>
      </div>
   )
}

export default FAQ
