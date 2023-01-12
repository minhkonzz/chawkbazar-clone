import './index.css'
import { useRef } from 'react'
import { terms } from './static-data'

const Terms = () => {

  const refs = useRef([])
  const scrollToTerm = (index) => window.scrollTo(0, refs.current[index].offsetTop)

  return (
    <div className="terms-detail row">
      <div className="col lg-3 lg-offset-1 md-3 sm-12">
        <div> {
          terms.map((term, index) => <p onClick={() => scrollToTerm(index)} style={{ marginBottom: 20 }} key={index}>{term.title}</p>)
        }
        </div>
      </div>
      <div className="col lg-7 md-9 sm-12">
        <div> {
          terms.map((term, index) =>
            <div ref={element => refs.current[index] = element} key={index} className="term">
              <h2>{term.title}</h2><br />
              <p>{term.desc}</p>
            </div>
          )
        }
        </div>
      </div>
    </div>
  )
}

export default Terms;