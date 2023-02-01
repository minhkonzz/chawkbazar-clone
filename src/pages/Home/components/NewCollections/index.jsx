import './index.css';
import { newCollections } from './data';
import NewCollection from './components/NewCollection';

const NewCollections = () => (
  <>
    <span className="home__section__title">New collections</span>
    <div className="home__new-collections__items"> 
      { newCollections.map((collection, i) => <NewCollection key={i} collection={collection}/>) } 
    </div>
  </> 
);

export default NewCollections;