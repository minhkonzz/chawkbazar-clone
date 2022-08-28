import './Home.css'
import Slider from './components/Banner/Slider'
import Promotions from './components/Promotions/Promotions'
import BestSellers from './components/BestSellers/BestSellers'
import TopBrands from './components/TopBrands'
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts'
import NewCollections from './components/NewCollections/NewCollections'
import Contact from './components/Contact/Contact'
import axiosInstance from '../../utils/axios'
import { useState, useEffect, useRef, createContext } from 'react'

export const sectionContext = createContext()

const Section = (props) => {

  const { handleVisible, callAPI, rootClassValue } = props.inputs
  
  const sectionRef = useRef(null)
  const [ sectionData, setSectionData ] = useState(![])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0]
      const isVisible = !!entry?.isIntersecting
      // entry?.target.classList.toggle("visible", isVisible)
      if (isVisible) {
        entry?.target.classList.toggle("visible", isVisible)
        if (callAPI) {
          axiosInstance.get(callAPI?.endpoint)
          .then(response => {
            const dataResponse = response?.data
            if (Array.isArray(dataResponse) && dataResponse.length > 0) setSectionData(dataResponse)
          })
          .catch(err => console.log(err))
        }
        else setSectionData(!sectionData)
        handleVisible()
        observer.unobserve(entry?.target)
      }
    })
    observer.observe(sectionRef?.current)
  }, [])

  return (
    <sectionContext.Provider value={sectionData}>
      <section className={`h-sec row ${rootClassValue}`} ref={sectionRef}>
        { sectionData && props.children }
      </section>
    </sectionContext.Provider>
  )
}

const Home = () => {

  const sections = [
    { component: Slider, handleVisible: () => {} }, 
    { component: FeaturedProducts, handleVisible: () => {}, callAPI: { endpoint: 'featuredproducts' } }, 
    { component: Promotions, handleVisible: () => {}, rootClassValue: 'promotions' },
    { component: BestSellers, handleVisible: () => {}, callAPI: { endpoint: 'bestsellers' } },
    { component: NewCollections, handleVisible: () => {} },
    { component: TopBrands, handleVisible: () => {}, callAPI: { endpoint: 'topbrands' } },
    { component: Contact, handleVisible: () => {}, rootClassValue: 'contact' }
  ]

  return (
    <> {
      sections.map((section, index) => {
        const { component: SectionComponent, handleVisible, callAPI, rootClassValue } = section
        return (
          <Section 
            key={index}
            inputs={{ handleVisible, callAPI, rootClassValue }}>
            <SectionComponent />
          </Section>
        )
      })}
    </>
  )
}

export default Home