import styles from "./page.module.css";
import Banner from "@/components/organisms/banner";

const _navLinks = [
  {
    id: "nl1",
    title: "Purpose",
    desc: `Little & Big is committed to protecting your privacy because we are committed to valuing people. Our Privacy Policy below sets out how your personal information is collected, used and protected. The Demo Country Privacy Principles\n\nThis Privacy Policy describes our policies and procedures on the collection, holding, use and disclosure of your personal information and should be read together with our Terms and Conditions. By providing your personal information you consent to our collection, use and disclosure of that information in accordance with this Privacy Policy.`
  },
  {
    id: "nl2",
    title: "What is Personal Data?",
    desc: "When used in this Policy, 'personal information' has the meaning given in the Privacy Act. Generally, it means any information or an opinion that could be used to identify you."
  },
  {
    id: "nl3",
    title: "Personal Data Collected",
    desc: "Personal Data collected for the following purposes and using the following services:\nGoogle Analytics: Cookies; Usage Data\nContact form: email address; first name; phone number\nMailing list or newsletter: email address; first name"
  },
  {
    id: "nl4",
    title: "Accessing your Personal Data",
    desc: "You may request access to your personal information collected by us, and ask that we correct that personal information. You can ask for access or correction by contacting us and we will usually respond within 30 days. If we refuse to give you access to, or correct, your personal information, we will notify you in writing setting out the reasons."
  },
  {
    id: "nl5",
    title: "Complaints",
    desc: "If you believe your privacy has been breached or you have a complaint about how we have handled your personal information, please contact us in writing.  We will respond within a reasonable period (usually within 30 days)."
  },
  {
    id: "nl6",
    title: "Owner and Data Controller",
    desc: "The Commons\n20-40 demo St,\nJon doe NSW 2008\nCountry\n\nEmail: demo@demo.com"
  }
];

export default function Policy() {
  return (
    <Banner title="Privacy policy">
      <div className={styles.wrapper}>
        <div className="wrapper1920">
          <div className={`${styles.wrapper} d-flex`}>
            <nav className={styles.nav}>
              <ol className={styles.navInner}>
                {_navLinks.map((e, i) => (
                  <li key={e.id}>
                    <a
                      href={`#title-${i + 1}`}
                      className={`${styles.navLink} d-b`}>
                      {`${(i > 9 && i) || `0${i}`}. ${e.title}`}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className={styles.detail}>
              {_navLinks.map((e, i) => (
                <div
                  id={`title-${i + 1}`}
                  key={e.id}
                  className={styles.section}>
                  <h2 className={styles.sectionHeading}>{e.title}</h2>
                  <p className={styles.sectionText}>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Banner>
  );
}
