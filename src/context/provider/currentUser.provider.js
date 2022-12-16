import { useState, useEffect, createContext } from "react"; 
import { AuthService } from "../../services/firebase/auth";

export const CurrentUserContext = createContext(); 

const CurrentUserProvider = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState(null); 
  const currentUserStorage = JSON.parse(localStorage.getItem("firebase:authUser:AIzaSyBxVgXQz6vg-YYgEN275e9Ai58UCDnk_Lw:[DEFAULT]"));

  const updateCurrentUser = (currentUser) => {
    if (currentUser) {
      const { userLoggedIn, referencesAdvance } = currentUser; 
      setCurrentUser({ userLoggedIn, referencesAdvance });
      return; 
    }
    setCurrentUser(null); 
  }

  const onUserSignedIn = (currentUser) => {
    const { currentUserInstance, currentUserRefs } = currentUser; 
    updateCurrentUser({
      userLoggedIn: currentUserInstance, 
      referencesAdvance: currentUserRefs
    });
  }

  const onUserSignedOut = () => { updateCurrentUser(null); }

  useEffect(() => {
    AuthService.listenToAuthState(onUserSignedIn, onUserSignedOut);     
  }, [])

  if (currentUser === null && !currentUserStorage) return ( <>{children}</> );

  return (
    currentUser && 
    <CurrentUserContext.Provider value={{ currentUser, updateCurrentUser }}>
      { children }
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserProvider;