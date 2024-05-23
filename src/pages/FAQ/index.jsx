// import "./faq.css";
// import { QA } from "./static-data";
// import { useState } from "react";

// const AQBox = (props) => {

//   const [ openAnswer, setOpenAnswer ] = useState(false);

//   return (
//     <>
//       <div className="faq__question">
//         <p className="faq__question-text">{props.data.question}</p>
//         <button className={`faq__question__answer-button${openAnswer ? " opening" : ""}`} onClick={() => setOpenAnswer(!openAnswer)}>
//           <ion-icon name="add" />
//         </button>
//       </div>
//       <div className={`faq__answer${openAnswer ? " active" : ""}`}>
//         <p className={`faq__answer-text${openAnswer ? " visible" : ""}`}>{props.data.answer}</p>
//       </div>
//     </>
//   )
// }

// const FAQ = () => {
//   return (
//     <div className="faq">
//       { QA.map((d, i) => <div key={i} className="q-a"><AQBox data={d}/></div>) }
//     </div>
//   )
// }

// export default FAQ;
