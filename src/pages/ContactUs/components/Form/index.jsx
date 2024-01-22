import UserInput from "common/components/UserInput";

const Form = () => {
  return (
    <div className="contact-us__content">
      <span className="contact-us__content__title">Get in touch</span>
      <div className="contact-us__content__form">
        <UserInput h={55} label="Your name *"/>
        <UserInput h={55} label="Your email *"/>
        <UserInput h={55} label="Subject"/>
        <UserInput h={55} label="Message" isTextArea rows={7} />
        <button className="contact-us__send-message-button">Send message</button>
      </div>
    </div>
  )
}

export default Form;