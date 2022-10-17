import './NewCollections.css'
import NewCollection from './NewCollection'

const newCollections = [ 
   {
      image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcollection%2F1.jpg&w=640&q=75',
      title: 'New Spring Knits', 
      desc: 'Endlessly versatile new styles that say yes to spring. The season’s looking bright.'
   },
   {
      image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcollection%2F2.jpg&w=640&q=75',
      title: 'Down to the core', 
      desc: 'Endlessly versatile new styles that say yes to spring. The season’s looking bright.'
   },
   {
      image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcollection%2F3.jpg&w=640&q=75',
      title: 'New Winter Knits', 
      desc: 'Endlessly versatile new styles that say yes to spring. The season’s looking bright.'
   }
]

const NewCollections = () => <> { newCollections.map((collection, index) => <NewCollection key={index} collection={collection}/>) } </>

export default NewCollections