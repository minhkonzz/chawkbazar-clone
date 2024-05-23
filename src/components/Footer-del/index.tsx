import "./footer.css";
import { footerSections } from "./footer-data";

const Footer = () => {
  return (
    <footer>
      { footerSections.map((footerSection, i) => 
        <div key={i} className="footer__section">
          <h4 className="footer__section__title">{footerSection.sectionTitle}</h4>
          <div className="footer__section__links">
            { footerSection.paths.map((path, i) => <a className="footer__section__link" key={i} href={path.pathRef}>{path.pathName}</a>) }
          </div>
        </div>
      )}
    </footer>  
  )
}

export default Footer;