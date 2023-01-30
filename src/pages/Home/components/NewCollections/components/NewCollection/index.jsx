const NewCollection = ({ collection }) => {

  return (
    <div className="col lg-4 md-6 sm-12">
      <div className="new-collection">
        <div className="collection-img posrel o-h">
          <img src={collection?.image} className="w-100pc"/>
          <button className="view-collection-btn posab bottom-m10pc right-3pc light-v thin-bd-r ex-blur">
            View Collection
          </button>
        </div>
        <div className="new-collection-detail">
          <h1>{collection?.title}</h1>
          <p>{collection?.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default NewCollection;