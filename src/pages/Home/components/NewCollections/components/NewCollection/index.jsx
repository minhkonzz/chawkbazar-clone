const NewCollection = ({ collection }) => {

  return (
    <div className="home__new-collections__item">
      <div className="home__new-collections__item__image">
        <img src={collection?.image} />
        <button className="home__new-collections__item__view-button">View Collection</button>
      </div>
      <div className="home__new-collections__item__about">
        <p className="home__new-collections__item__title">{collection?.title}</p>
        <p className="home__new-collections__item__description">{collection?.desc}</p>
      </div>
    </div>
  )
}

export default NewCollection;