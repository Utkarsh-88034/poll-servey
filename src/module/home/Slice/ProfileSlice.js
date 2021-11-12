import {createSlice} from "@reduxjs/toolkit"
import {UserInfo} from "../model";
const profileInfo = {
    profile : {
    },
    isSubmited : false,   
    error : '',  
    isLoading : false,
    success : false,   

}
const profileInfoSlice = createSlice({
   name : "profileInfo",
   initialState : profileInfo,
   reducers : {
    profileInfoSumbmit : state => {        
         state.isSubmited=true;
         state.error='';    
         state.isLoading = true;
         state.success = false;             
     }, 
     profileInfoSucess : (state,action) => {        
         state.profile = action.payload;      
         state.isSubmited=false;
         state.error='';          
         state.isLoading = false;   
         state.success = true;  
           
     },
     profileInfoFailed : (state,action) =>  {       
         state.error = action.payload;
         state.profile = profileInfo.profile;      
         state.isSubmited=false;
         state.isLoading = false;
         state.success = false;      
     }
   },
   extraReducers : {},
});

export const selectProfileInfoState = profileInfo => profileInfo.profile;
export const {profileInfoSumbmit, profileInfoSucess , profileInfoFailed} = profileInfoSlice.actions;

export default profileInfoSlice.reducer;