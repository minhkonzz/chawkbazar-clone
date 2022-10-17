import { useReducer, createContext, useContext } from 'react'

const Context = createContext()
export const useCreatedContext = () => useContext(Context)

const Provider = ({ reducer, initialState, children }) => {

   const [ state, dispatch ] = useReducer(reducer, initialState)

   return (
      <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
   )
}

export default Provider