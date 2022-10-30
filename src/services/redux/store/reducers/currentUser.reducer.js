import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userLoggedIn: JSON.parse(localStorage.getItem("currentUser"))  
}

export const currentUserReducer = createSlice({
   name: "currentUser", 
   initialState, 
   reducers: {
      updateCurrentUser: (state, action) => {
         state.userLoggedIn = action.payload; 
         localStorage.setItem("currentUser", JSON.stringify(action.payload))
      }
   }
})

export const { updateCurrentUser } = currentUserReducer.actions
export default currentUserReducer.reducer