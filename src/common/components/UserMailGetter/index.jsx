import './index.css'

const UserMailGetter = () => {
  return (
    <div className="mail__getter">
      <div className="mail__getter-left">
        <p className="mail__getter-left__title">Get Expert Tips In Your Inbox</p>
        <p className="mail__getter-left__description">Subscribe to our newsletter and stay updated.</p>
      </div>
      <div className="mail__getter-right">
        <input className="mail__getter-right__input" type="text" placeholder="Write your email here"/>
        <button className="mail__getter-right__sub-button">Subscribe</button>
      </div>
    </div>
  )
}

export default UserMailGetter;