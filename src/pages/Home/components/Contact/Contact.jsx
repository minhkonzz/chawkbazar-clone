import './Contact.css'
import Button from '../../../../common/Button/Button'

const Contact = () => {
   return (
      <div className="col lg-12 md-12 sm-12">
         <div className="contact-w d-flex fd-col at-center text-center">
            <div className="title">
               <h1>Talk To A Real Person</h1>
               <p>Are you on the fence? Have a question? Need a recommendation?<br/>Member Services is always here to help. Send us a message.</p>
            </div>
            <img src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsupport.png&w=1080&q=75"/>
            <Button text="Chat with member services" w={280}/> 
         </div>
      </div>
   )
}

export default Contact