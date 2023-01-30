import { useContext } from "react";
import Slider from './components/Banner';
import Promotions from './components/Promotions';
import BestSellers from './components/BestSellers';
import TopBrands from './components/TopBrands';
import FeaturedProducts from './components/FeaturedProducts';
import NewCollections from './components/NewCollections';
import Contact from './components/Contact';
import { useEffect, useRef } from 'react';
import HomeSectionProvider, { HomeSectionContext } from "context/provider/homeSection.provider";
import './index.css'

const Section = (props) => {

  const { updateSectionData } = useContext(HomeSectionContext);
  const { isAsync, sectionClassName } = props;
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
  }, []);

  return (
    <section className={`home__section ${sectionClassName}`} ref={sectionRef}>
      { props.children }
    </section>
  )
}

const Home = () => {

  const sections = [
    { component: Slider, sectionClassName: "home__banner" }, 
    { component: BestSellers, sectionClassName: "home__best-sellers", isAsync: { collectionName: 'products' } },
    // { component: NewCollections, sectionClassName: "home__new-collections" },
    // { component: TopBrands, sectionClassName: "home__top-brands", isAsync: { collectionName: 'brands' } },
    // { component: Contact, sectionClassName: "home__contact"}
  ]

  return (
    <> {
      sections.map((section, index) => {
        const { component: SectionComponent, isAsync, sectionClassName } = section
        return (
          <HomeSectionProvider key={index}>
            <Section
              {...{ isAsync, sectionClassName }}>
              <SectionComponent />
            </Section>
          </HomeSectionProvider>
        )
      })}
    </>
  )
}

export default Home;
