import styles from "./styles.module.css";

export default function RadioGroup({ options }: { options: any }) {
   return (
      <>
         { options.map((e: any, i: number) => 
            <label key={`rg${i}`} className="d-flex at-center">
               <input type="radio" className={styles.inp} value={e.value} />
               <span className={styles.title}>{e.title}</span>
            </label>   
         ) }
      </>
   )
}