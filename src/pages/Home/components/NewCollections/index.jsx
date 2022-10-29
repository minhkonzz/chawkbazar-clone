import './index.css'
import { newCollections } from './data'
import NewCollection from './components/NewCollection'

const NewCollections = () => <> { newCollections.map((collection, index) => <NewCollection key={index} collection={collection}/>) } </>

export default NewCollections