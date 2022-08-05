import './UserMailGetter.css'

const UserMailGetter = () => {
  return (
    <div className="row">
      <div className="col lg-12 md-12 sm-12">
        <div className="user-mail-getter d-flex jc-sb at-center">
          <div className="left-side">
            <h2>Get Expert Tips In Your Inbox</h2>
            <p className="blur">Subscribe to our newsletter and stay updated.</p>
          </div>
          <div className="right-side">
            <div className="d-flex">
              <input className="h-100pc" type="text" placeholder="Write your email here"/>
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserMailGetter 