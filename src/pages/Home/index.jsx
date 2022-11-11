import { useContext } from "react";
import Slider from './components/Banner'
import Promotions from './components/Promotions'
import BestSellers from './components/BestSellers'
import TopBrands from './components/TopBrands'
import FeaturedProducts from './components/FeaturedProducts'
import NewCollections from './components/NewCollections'
import Contact from './components/Contact'
import { useEffect, useRef } from 'react'
import HomeSectionProvider, { HomeSectionContext } from "../../context/provider/homeSection.provider";
import './index.css'

const Section = (props) => {

  const { updateSectionData } = useContext(HomeSectionContext);
  const { isAsync, rootClassValue } = props.inputs;
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]; 
      const isVisible = !!entry?.isIntersecting;
      if (isVisible) {
        entry?.target.classList.toggle("visible", isVisible);
        updateSectionData(isAsync);
        observer.unobserve(entry?.target);
      }
    }, { threshold: 0.4 });
    observer.observe(sectionRef.current)
  }, [])

  return (
    <section className={`h-sec row${rootClassValue || ''}`} ref={sectionRef}>
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
          <HomeSectionProvider key={index}>
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
