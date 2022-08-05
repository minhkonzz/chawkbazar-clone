const Contact = (props) => {
  return (
    <div className="d-flex">
      <div className="contact-icon">
        <ion-icon name="location" />
      </div>
      <div className="contact-detail">
        <span><b>Address</b></span>
        <p>PO Box 14122 Collins Street West.Victoria</p>
      </div>
    </div>
  )
}

export default Contact