import Slider from './components/Banner'
import Promotions from './components/Promotions'
import BestSellers from './components/BestSellers'
import TopBrands from './components/TopBrands'
import FeaturedProducts from './components/FeaturedProducts'
import NewCollections from './components/NewCollections'
import Contact from './components/Contact'
import { Provider as HomeSectionProvider } from '../../context'
import { setSectionData } from '../../services/redux/actions/home_section.actions'
import { useCreatedContext } from '../../context/provider'
import { useEffect, useRef } from 'react'
import HomeSectionReducer, { initialState } from "../../services/redux/store/reducers/home_section.reducer"
import { getAllRecords } from '../../services/firebase/common'
import { AuthService } from "../../services/firebase/auth"
import './index.css'

const Section = (props) => {

  const [ state, dispatch ] = useCreatedContext();
  console.log("check state in Home Page", state);  
  const { isAsync, rootClassValue } = props.inputs;
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]; 
      const isVisible = !!entry?.isIntersecting;
      if (isVisible) {
        entry?.target.classList.toggle("visible", isVisible);
        if (isAsync) {
          getAllRecords(isAsync.collectionName || "error")
          .then((responseData) => {
            dispatch(setSectionData(responseData)); 
          });
        }
        else dispatch(setSectionData(!state.sectionData));
        observer.unobserve(entry?.target);
      }
    }, { threshold: 0.4 });
    observer.observe(sectionRef.current)
  }, [])

  return (
    <section id="sectiond" className={`h-sec row${rootClassValue || ''}`} ref={sectionRef}>
      { props.children }
    </section>
  )
}

// { component: Promotions, handleVisible: () => {}, rootClassValue: ' promotions' },

const Home = () => {
    // { component: FeaturedProducts, callAPI: { endpoint: 'featuredproducts' } },
    
  const sections = [
    { component: Slider }, 
    { component: BestSellers, isAsync: { collectionName: 'products' } },
    { component: NewCollections, rootClassValue: ' new-collections' },
    { component: TopBrands, isAsync: { collectionName: 'brands' } },
    { component: Contact, rootClassValue: ' contact' }
  ]

  return (
    <> {
      sections.map((section, index) => {
        const { component: SectionComponent, isAsync, rootClassValue } = section
        return (
          <HomeSectionProvider
            key={index}
            reducer={HomeSectionReducer}
            initialState={initialState}>
            <Section
              inputs={{ isAsync, rootClassValue }}>
              <SectionComponent />
            </Section>
          </HomeSectionProvider>
        )
      })}
    </>
  )
}

export default Home
