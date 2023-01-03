import { useState, createContext } from "react";
import { getAllRecords } from "services/firebase/common";

export const HomeSectionContext = createContext(); 

const HomeSectionProvider = ({ children }) => {

  const [ sectionData, setSectionData ] = useState([]); 

  const updateSectionData = async(isAsync) => {
    if (isAsync) {
      const responseData = await getAllRecords(isAsync.collectionName || "error");
      setSectionData(responseData); 
      return; 
    }
    setSectionData(!sectionData);
  }

  return (
    <HomeSectionContext.Provider value={{ sectionData, updateSectionData }}>
      { children }
    </HomeSectionContext.Provider>
  )
}

export default HomeSectionProvider;