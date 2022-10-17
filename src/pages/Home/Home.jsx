import Slider from './components/Banner'
import Promotions from './components/Promotions'
import BestSellers from './components/BestSellers'
import TopBrands from './components/TopBrands'
import FeaturedProducts from './components/FeaturedProducts'
import NewCollections from './components/NewCollections'
import Contact from './components/Contact'
import getSectionData from '../../utils/fetch'
import { BaseSource } from '../../utils/constants'
import { Provider as HomeSectionProvider } from '../../store'
import { setSectionData } from '../../store/Actions/HomeSection'
import { useCreatedContext } from '../../store/Provider'
import { useEffect, useRef } from 'react'
import HomeSectionReducer, { initialState } from '../../store/Reducers/homesection'
import './Home.css'

const Section = (props) => {

  const [ state, dispatch ]  = useCreatedContext()
  const { handleVisible, callAPI, rootClassValue } = props.inputs
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0]
      const isVisible = !!entry?.isIntersecting
      if (isVisible) {
        entry?.target.classList.toggle("visible", isVisible)
        if (callAPI) {
          getSectionData({
            prefix: BaseSource?.BASE_URL, 
            endpoint: callAPI?.endpoint || 'error'
          })
          .then(responseData => {
            if (Array.isArray(responseData) && responseData.length > 0) 
              dispatch(setSectionData(responseData))
          })
          .catch(err => console.log(err))
        }
        else dispatch(setSectionData(!state?.sectionData))
        handleVisible()
        observer.unobserve(entry?.target)
      }
    }, {
      threshold: 0.5
    })
    observer.observe(sectionRef?.current)
  }, [])

  return (
    <section className={`h-sec row${rootClassValue || ''}`} ref={sectionRef}>
      { props.children }
    </section>
  )
}

// { component: Promotions, handleVisible: () => {}, rootClassValue: ' promotions' },

const Home = () => {

  const sections = [
    { component: Slider, handleVisible: () => {} }, 
    { component: FeaturedProducts, handleVisible: () => {}, callAPI: { endpoint: 'featuredproducts' } }, 
    { component: BestSellers, handleVisible: () => {}, callAPI: { endpoint: 'bestsellers' } },
    { component: NewCollections, handleVisible: () => {}, rootClassValue: ' new-collections' },
    { component: TopBrands, handleVisible: () => {}, callAPI: { endpoint: 'topbrands' } },
    { component: Contact, handleVisible: () => {}, rootClassValue: ' contact' }
  ]

  return (
    <> {
      sections.map((section, index) => {
        const { component: SectionComponent, handleVisible, callAPI, rootClassValue } = section
        return (
          <HomeSectionProvider
            key={index}
            reducer={HomeSectionReducer}
            initialState={initialState}>
            <Section
              inputs={{ handleVisible, callAPI, rootClassValue }}>
              <SectionComponent />
            </Section>
          </HomeSectionProvider>
        )
      })}
    </>
  )
}

export default Home
