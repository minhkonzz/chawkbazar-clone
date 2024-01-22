import "./terms.css";
import { useRef } from "react";
import { terms } from "./static-data";

const Terms = () => {

  const refs = useRef([]);
  const scrollToTerm = (i) => window.scrollTo(0, refs.current[i].offsetTop);

  return (
    <div className="terms">
      <div className="terms__tabs"> {
        terms.map((term, i) => <p className="terms__tab" onClick={() => scrollToTerm(i)} key={i}>{term.title}</p>)
      }
      </div>
      <div className="terms__content"> {
        terms.map((term, i) =>
          <div ref={element => refs.current[i] = element} key={i} className="term">
            <span className="term__title">{term.title}</span>
            <p className="term__description">{term.desc}</p>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default Terms;