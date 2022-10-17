import UserInput from '../../../common/UserInput/UserInput'

const CheckoutFields = () => {
  return (
    <div className="checkout-fields row">
      <div className="col lg-12 md-12 sm-12">
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <h2>Shipping Address</h2>
          </div>
        </div>
        <div className="row">
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="First name *"/>
          </div>
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="Last name *"/>
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <UserInput label="Address *" />
          </div>
        </div>
        <div className="row">
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="Phone/Mobile *"/>
          </div>
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="Email *"/>
          </div>
        </div>
        <div className="row">
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="City/Town"/>
          </div>
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="Postcode"/>
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <input type="checkbox" />
            <label>Save this information for the next time</label>
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <UserInput label="Order notes (Optional)" isTextArea rows={7} />
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <button style={{ width: 140, height: 55 }} className="dark-v fw-600 thin-bd-r">
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutFields