import './index.css';
import { newCollections } from './data';
import NewCollection from './components/NewCollection';

const NewCollections = () => (
  <>
    <div className="col lg-12 md-12 sm-12 mb-24px">
      <h1>New collections</h1>
    </div> 
    { 
      newCollections.map((collection, index) => <NewCollection key={index} collection={collection}/>) 
    } 
  </> 
);

export default NewCollections;