import { ReactNode } from "react";
import styles from "./layout.module.css";
import Banner from "@/components/banner";

const _navLinks = [
   { id: "nl1", path: "/profile", title: "Profile", ic: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={styles.ic} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="176" cy="416" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle><circle cx="400" cy="416" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M48 80h64l48 272h256"></path><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128"></path></svg> },
   { id: "nl2", path: "/orders", title: "Orders", ic: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={styles.ic} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"></path><path fill="none" strokeMiterlimit="10" strokeWidth="32" d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"></path></svg> },
   { id: "nl3", path: "/change-password", title: "Change password", ic: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={styles.ic} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"></path></svg> }
];

export default function Account({ children }: { children: ReactNode }) {
   return (
      <Banner title="My account">
         <div className="wrapper1920">
            <div className={`${styles.container} d-flex mx-auto`}>
               <nav className={styles.nav}>
                  {_navLinks.map((e, i) => 
                     <a className={`${styles.link} d-flex at-center cp d-b`} href={e.path} key={e.id}>
                        {e.ic}
                        <span className={styles.linkText}>{e.title}</span>
                     </a>
                  )}
                  <button className={`${styles.link} d-flex at-center cp d-b`}>
                     <svg  
                        stroke="currentColor" 
                        fill="currentColor" 
                        strokeWidth="0" 
                        viewBox="0 0 512 512" 
                        className={styles.ic} 
                        height="1em" 
                        width="1em" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path 
                           fill="none" 
                           strokeLinecap="round" 
                           strokeLinejoin="round" 
                           strokeWidth="32" 
                           d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256">   
                        </path>
                     </svg>
                     Logout
                  </button>
               </nav>
               <div className={styles.main}>
                  {children}
               </div>
            </div>
         </div>
      </Banner>
   )
}

// import './index.css';
// import { useState } from "react";
// import AccountDetail from "./components/AccountDetail";
// import Orders from "./components/Orders";
// import PasswordUpdate from "./components/PasswordUpdate";
// import { profileTabs } from './static-data';

// const Profile = () => {

//   const [ selectedIndex, setSelectedIndex ] = useState(0);

//   return (
//     <div className="profile">
//       <div className="profile__tabs"> {
//         profileTabs.map((tab, i) => (
//           <div key={i} className={`profile__tab${selectedIndex === i ? ' selected' : ''}`} onClick={() => setSelectedIndex(i)}>
//             <ion-icon name={tab?.icon} />
//             <span className="profile__tab__title">{tab?.title}</span>
//           </div>
//         )) 
//       }
//       </div>
//       <div className="profile__content"> {
//         (selectedIndex === 0 && <></>) ||
//         (selectedIndex === 1 && <Orders />) ||
//         (selectedIndex === 2 && <AccountDetail />) || 
//         (selectedIndex === 3 && <PasswordUpdate />) || 
//         (selectedIndex === 4 && <></>)
//       }
//       </div>
//     </div>
//   )
// }

// export default Profile;