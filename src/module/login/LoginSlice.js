import {createSlice} from "@reduxjs/toolkit"

const authState = {
    username : '',
    session : JSON.parse(localStorage.getItem('session')) || {},
    isSubmited : false,
    error : '',
    isAuthenticated : true, 
    isLoading : false,
}
const authSlice = createSlice({
   name : "authStates",
   initialState : authState,
   reducers : {
     loginSumbmit : state => {        
        state.isSubmited=true;
        state.error='';
        state.isAuthenticated = false;       
        state.isLoading = true;       
     }, 
     loginSucess : (state,action) => {        
        state.session = action.payload;
        localStorage.setItem('session',JSON.stringify(state.session));
        state.isSubmited=false;
        state.error='';
        state.isAuthenticated = true;       
        state.isLoading = false;         
     },
     loginFailed : (state,action) =>  {       
         state.error = action.payload;
         state.isSubmited=false;
         state.isLoading = false;
         state.isAuthenticated = false; 
     },
     updateToken : (state,action) => {        
      state.session = action.payload;
      localStorage.setItem('session',JSON.stringify(state.session));     
     }
   },
   extraReducers : {},
});

export const selectAuthState = state => state.auth;
export const {loginSumbmit, loginSucess , loginFailed} = authSlice.actions;

export default authSlice.reducer;