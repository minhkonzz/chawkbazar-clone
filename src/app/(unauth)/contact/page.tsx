import styles from "./page.module.css";
import Banner from "@/components/banner";
import ContactPart from "@/components/contact-part";
import Image from "next/image";
import TextInput from "@/shared/components/text-input";

const contacts = [
   {
      id: "cts1",
      title: "Address",
      desc: "PO Box 14122 Collins Street West.Victoria",
      ic: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em"><path d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z"></path></svg>
   },
   {
      id: "cts2",
      title: "Email",
      desc: "example@example.com",
      ic: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em"><path d="M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z"></path></svg>
   },
   {
      id: "cts3",
      title: "Phone",
      desc: "+1 1234 5678 90, +1 0987 6543 21",
      ic: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em"><path d="M478.94 370.14c-5.22-5.56-23.65-22-57.53-43.75-34.13-21.94-59.3-35.62-66.52-38.81a3.83 3.83 0 00-3.92.49c-11.63 9.07-31.21 25.73-32.26 26.63-6.78 5.81-6.78 5.81-12.33 4-9.76-3.2-40.08-19.3-66.5-45.78s-43.35-57.55-46.55-67.3c-1.83-5.56-1.83-5.56 4-12.34.9-1.05 17.57-20.63 26.64-32.25a3.83 3.83 0 00.49-3.92c-3.19-7.23-16.87-32.39-38.81-66.52-21.78-33.87-38.2-52.3-43.76-57.52a3.9 3.9 0 00-3.89-.87 322.35 322.35 0 00-56 25.45A338 338 0 0033.35 92a3.83 3.83 0 00-1.26 3.74c2.09 9.74 12.08 50.4 43.08 106.72 31.63 57.48 53.55 86.93 100 133.22S252 405.21 309.54 436.84c56.32 31 97 41 106.72 43.07a3.86 3.86 0 003.75-1.26A337.73 337.73 0 00454.35 430a322.7 322.7 0 0025.45-56 3.9 3.9 0 00-.86-3.86z"></path></svg>
   },
]

export default function Contact() {
   return (
      <Banner title="Contact us">
         <div className={`${styles.container} d-flex mx-auto`}>
            <div className={styles.contacts}>
               <h4 className={styles.contactsHeading}>Find us here</h4>
               { contacts.map((e, i: number) => <ContactPart key={i} icon={e.ic} title={e.title} desc={e.desc} />) }
               <Image 
                  src="/map-image.jpg"
                  alt="map"
                  width={359}
                  height={185} 
               />
            </div>
            <div className={styles.getTouch}>
               <h4 className={styles.getInTouchHeading}>Get in touch</h4>
               <div className={`${styles.dinp} d-flex`}>
                  <div className={styles.inpWrapper}>
                     <TextInput 
                        label="Your name *"
                        placeholder="Enter your name"
                        inputValue=""
                        errorMessage=""
                     />
                  </div>
                  <div className={styles.inpWrapper}>
                     <TextInput 
                        label="Your email *"
                        placeholder="Enter your email"
                        inputValue=""
                        errorMessage=""
                     />
                  </div>
               </div>
               <div className={styles.dinp}>
                  <TextInput 
                     label="Subject *"
                     placeholder="Enter your subject"
                     inputValue=""
                     errorMessage=""
                  />
               </div>
               <div className={styles.dinp}>
                  <TextInput 
                     label="Message *"
                     placeholder="Writing your message here"
                     inputValue=""
                     errorMessage=""
                     textArea={{ r: 12, c: 4 }}
                  />
               </div>
            </div>
         </div>
      </Banner>
   )
}