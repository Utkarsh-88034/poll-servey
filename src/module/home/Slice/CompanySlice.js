import {createSlice} from "@reduxjs/toolkit"

const companyInfo = {
    data : {
       companyBasicInfo : {},
       modules : {
         navs: {},
         tabs : {}, 
       },            
       states : [],
       finance:{
            subscriptionInfo:{},
       },         
       logo : "",
    },
    companySummaryInfoList :[],
    defautSateCode : "",
    defautCompanyCode : "",
    isSubmited : false,   
    error : '',  
    isLoading : false,
    success : false,   

}
const companyInfoSlice = createSlice({
   name : "companyInfo",
   initialState : companyInfo,
   reducers : {
    companyInfoSateUpdate : (state,action)  => {        
        state.data.companyBasicInfo = action.payload;           
     },
     companyInfoSateNavsModuleUpdate : (state,action) => {
        state.data.modules.navs = action.payload;      
    },
    companyInfoSateTabsModuleUpdate : (state,action) => {        
        state.data.modules.tabs = action.payload;            
    },
    companyInfoStatesUpdate : (state,action) => {
        state.data.states = action.payload;    
    },   
   
    companyInfoSateLogoUpdate : (state,action) => {            
        state.data.logo = action.payload;   
    },
    companyInfoDefaultStatesUpdate : (state,action) => {        
        state.data.defautSateCode = action.payload;            
    },
    companyInfoSubscriptionUpdate : (state,action) => {        
        state.data.finance.subscriptionInfo  = action.payload;             
    },     
    companyInfoSateVoid : (state) => {        
        state.data.basicInfo = companyInfo.data.basicInfo;
        state.data.modules = companyInfo.data.modules;
        state.data.defaultState = companyInfo.data.defaultState; 
        state.data.othersStates = companyInfo.data.othersStates;         
        state.data.logo = companyInfo.data.logo;     
        state.data.finance.subscriptionInfo  = companyInfo.data.finance.subscriptionInfo;          
    },
    companyInfoSumbmit : state => {        
        state.isSubmited=true;
        state.error='';    
        state.isLoading = true;
        state.success = false;                 
    }, 
    companyInfoSucess : (state,action) => {    
        state.isSubmited=false;
        state.error='';          
        state.isLoading = false;   
        state.success = true;       
    },
    companyInfoFailed : (state,action) =>  {       
        state.error = action.payload;       
        state.isSubmited=false;
        state.isLoading = false;
        state.success = false;  
    },
    companyInfoStatusReset : (state) =>  {       
        state.error =  "";       
        state.isSubmited=false;
        state.isLoading = false;
        state.success = false;      
    }, 
    companyInfoStatusSummerySubmit : (state,action) =>  {       
        state.isSubmited=true;
        state.error='';    
        state.isLoading = true;
        state.success = false;       
    },       
    companyInfoStatusSummerySucess : (state,action) =>  {       
        state.companySummaryInfoList = action.payload;       
        state.isSubmited=false;
        state.isLoading = false;
        state.success = true;   
    },       
    companyInfoStatusSummeryFailed : (state,action) =>  {       
        state.error = action.payload;       
        state.isSubmited=false;
        state.isLoading = false;
        state.success = false;  
    },
    companyInfoFectchSubmit : (state,action) =>  {       
        state.isSubmited=true;
        state.error='';    
        state.isLoading = true;
        state.success = false;       
    },       
    companyInfoFectchSucess : (state,action) =>  {       
        state.data = action.payload;       
        state.isSubmited=false;
        state.isLoading = false;
        state.success = true;   
        console.log(state.data);
    },       
    companyInfoFectchFailed : (state,action) =>  {       
        state.error = action.payload;       
        state.isSubmited=false;
        state.isLoading = false;
        state.success = false;  
    },                                     
    companyInfoDefaultCompany : (state,action) => {
        state.defautCompanyCode = action.payload;    
    },    
   },
   extraReducers : {},
});

export const selectCompanyInfoState = companyInfo => companyInfo.company;
export const {
    companyInfoSateUpdate, 
    companyInfoSateNavsModuleUpdate , 
    companyInfoSateTabsModuleUpdate,
    companyInfoStatesUpdate, 
    companyInfoSateLogoUpdate,
    companyInfoSubscriptionUpdate,
    companyInfoSateVoid,
    companyInfoSumbmit,
    companyInfoSucess,
    companyInfoFailed,
    companyInfoStatusReset,    
    companyInfoStatusSummerySubmit,
    companyInfoStatusSummerySucess,
    companyInfoStatusSummeryFailed,
    companyInfoFectchSubmit,
    companyInfoFectchSucess,
    companyInfoFectchFailed,
    companyInfoDefaultCompany
} = companyInfoSlice.actions;

export default companyInfoSlice.reducer;