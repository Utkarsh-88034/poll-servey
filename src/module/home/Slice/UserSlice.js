import {createSlice} from "@reduxjs/toolkit"

const userInfo = {
    data : {
       basicInfo : {},
       modules : {
         navs: {},
         tabs : {}, 
       },
       defaultState : "",
       othersStates : [],
       subscriptionInfo : {
          subsStartDate : "2020-09-20",
          subsEndDate : "2025-12-01"
       },       
       logo : "",
    },

    isSubmited : false,   
    error : '',  
    isLoading : false,
    success : false,   

}
const userInfoSlice = createSlice({
   name : "userInfo",
   initialState : userInfo,
   reducers : {
    userInfoSateUpdate : (state,action)  => {        
        state.data.basicInfo = action.payload;           
     },
     userInfoSateNavsModuleUpdate : (state,action) => {
        state.data.modules.navs = action.payload;      
    },
    userInfoSateTabsModuleUpdate : (state,action) => {        
        state.data.modules.tabs = action.payload;            
    },
    userInfoSateDefaultStatesUpdate : (state,action) => {        
        state.data.defaultState = action.payload;            
    },  
    userInfoSateOthersStatesUpdate : (state,action) => {        
        state.data.othersStates = action.payload;            
    },
    userInfoSateSubscriptionUpdate : (state,action) => {        
        state.data.subscriptionInfo = action.payload;                   
    },
    userInfoSateLogoUpdate : (state,action) => {            
        state.data.logo = action.payload;   
    },
    userInfoSateVoid : (state) => {        
        state.data.basicInfo = userInfo.data.basicInfo;
        state.data.modules = userInfo.data.modules;
        state.data.defaultState = userInfo.data.defaultState; 
        state.data.othersStates = userInfo.data.othersStates;         
        state.data.logo = userInfo.data.logo;                 
    },
    userInfoSumbmit : state => {        
        state.isSubmited=true;
        state.error='';    
        state.isLoading = true;
        state.success = false;             
    }, 
    userInfoSucess : (state,action) => {    
        state.isSubmited=false;
        state.error='';          
        state.isLoading = false;   
        state.success = true;  
          
    },
    userInfoFailed : (state,action) =>  {       
        state.error = action.payload;       
        state.isSubmited=false;
        state.isLoading = false;
        state.success = false;      
    },
    userInfoStatusReset : (state) =>  {       
        state.error =  "";       
        state.isSubmited=false;
        state.isLoading = false;
        state.success = false;      
    },                        
    
   },
   extraReducers : {},
});

export const selectUserInfoState = userInfo => userInfo.user;
export const {
    userInfoSateUpdate, 
    userInfoSateNavsModuleUpdate , 
    userInfoSateTabsModuleUpdate,
    userInfoSateDefaultStatesUpdate,
    userInfoSateOthersStatesUpdate,
    userInfoSateSubscriptionUpdate,
    userInfoSateLogoUpdate,
    userInfoSateVoid,
    userInfoSumbmit,
    userInfoSucess,
    userInfoFailed,
    userInfoStatusReset,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;