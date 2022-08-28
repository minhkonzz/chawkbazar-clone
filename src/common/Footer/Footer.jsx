import './Footer.css'

const footerSections = [
  {
    sectionTitle: 'Social media',
    paths: [
      {
        pathName: 'Instagram',
        pathRef: '#'
      },
      {
        pathName: 'Facebook',
        pathRef: '#'
      },
      {
        pathName: 'Twitter',
        pathRef: '#'
      },
      {
        pathName: 'Youtube',
        pathRef: '#'
      }
    ]
  },
  {
    sectionTitle: 'Contact',
    paths: [
      {
        pathName: 'Contact us',
        pathRef: '#'
      },
      {
        pathName: 'yourexample@gmail.com',
        pathRef: '#'
      },
      {
        pathName: 'example@email.com',
        pathRef: '#'
      },
      {
        pathName: 'Call us: +1 254 568-5479',
        pathRef: '#'
      }
    ]
  },
  {
    sectionTitle: 'About',
    paths: [
      {
        pathName: 'Support center',
        pathRef: '#'
      },
      {
        pathName: 'Customer support',
        pathRef: '#'
      },
      {
        pathName: 'About us',
        pathRef: '#'
      },
      {
        pathName: 'Copyright',
        pathRef: '#'
      }
    ]
  },
  {
    sectionTitle: 'Customer care',
    paths: [
      {
        pathName: 'FAQ & Help',
        pathRef: '#'
      },
      {
        pathName: 'Shipping and Delivery',
        pathRef: '#'
      },
      {
        pathName: 'Returns & Exchange',
        pathRef: '#'
      }
    ]
  },
  {
    sectionTitle: 'Our information',
    paths: [
      {
        pathName: 'Privacy policy update',
        pathRef: '#'
      },
      {
        pathName: 'Terms & Condition',
        pathRef: '#'
      },
      {
        pathName: 'Return policy',
        pathRef: '#'
      },
      {
        pathName: 'Site Map',
        pathRef: '#'
      }
    ]
  },
  {
    sectionTitle: 'Top Categories',
    paths: [
      {
        pathName: "Men's wear",
        pathRef: '#'
      },
      {
        pathName: "Kid's wear",
        pathRef: '#'
      },
      {
        pathName: 'Sports wear',
        pathRef: '#'
      }
    ]
  }
]

const FooterSection = (props) => {
  return (
    <div className="col lg-2 md-3 sm-6">
      <div className="footer-section">
        <h4 className="section-title">{props.section.sectionTitle}</h4>
        <div className="section-parts">
          { props.section.paths.map((path, index) => <a key={index} href={path.pathRef}>{path.pathName}</a>) }
        </div>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="row">
      { footerSections.map((section, index) => <FooterSection key={index} section={section}/>) }
    </footer>  
  )
}

export default Footer