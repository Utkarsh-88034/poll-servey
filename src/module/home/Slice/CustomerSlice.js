import {createSlice} from "@reduxjs/toolkit"

const customerInfo = {
    data : {
       basicInfo : {},
       modules : {
         navs: {},
         tabs : {}, 
       },
       states : [],
       moduleMappingInfo : {
        navs: {},
        tabs : {}, 
       },
       defaultState : "",
       othersStates : [],
       subscriptionInfo : { },       
       logo : "",
    },
    companyInfo : {
       companyBasicInfo : {},
       moduleMappingInfo : {
         navs: {},
         tabs : {}, 
       },     
       geography : {
         states : []
       },
       finance:{
            subscriptionInfo:{},
       },         
    },
    defautCompanyCode : "",
    isSubmited : false,   
    error : '',  
    isLoading : false,
    success : false,   

}
const customerInfoSlice = createSlice({
   name : "customerInfo",
   initialState : customerInfo,
   reducers : {
    customerInfoSateUpdate : (state,action)  => {        
        state.data.basicInfo = action.payload;           
     },
     customerInfoSateNavsModuleUpdate : (state,action) => {
        state.data.modules.navs = action.payload;      
    },
    customerInfoSateTabsModuleUpdate : (state,action) => {        
        state.data.modules.tabs = action.payload;            
    },
    ucustomerInfoSateDefaultStatesUpdate : (state,action) => {        
        state.data.defaultState = action.payload;            
    },  
    customerInfoSateOthersStatesUpdate : (state,action) => {        
        state.data.othersStates = action.payload;            
    },
    customerInfoSateSubscriptionUpdate : (state,action) => {        
        state.data.subscriptionInfo = action.payload;                   
    },
    customerInfoSateLogoUpdate : (state,action) => {            
        state.data.logo = action.payload;   
    },
    customerInfoSateVoid : (state) => {        
        state.data.basicInfo = customerInfo.data.basicInfo;
        state.data.modules = customerInfo.data.modules;
        state.data.defaultState = customerInfo.data.defaultState; 
        state.data.othersStates = customerInfo.data.othersStates;         
        state.data.logo = customerInfo.data.logo;                 
    },
    customerInfoSumbmit : state => {        
        state.isSubmited=true;
        state.error='';    
        state.isLoading = true;
        state.success = false;             
    }, 
    customerInfoSucess : (state,action) => {    
        state.isSubmited=false;
        state.error='';          
        state.isLoading = false;   
        state.success = true;  
          
    },
    customerInfoFailed : (state,action) =>  {       
        state.error = action.payload;       
        state.isSubmited=false;
        state.isLoading = false;
        state.success = false;      
    },
    customerInfoStatusReset : (state) =>  {       
        state.error =  "";       
        state.isSubmited=false;
        state.isLoading = false;
        state.success = false;      
    },                        
    customerInfoCompanyFectchSubmit : (state,action) =>  {       
        state.isSubmited=true;
        state.error='';    
        state.isLoading = true;
        state.success = false;       
    },       
    customerInfoCompanyFectchSucess : (state,action) =>  {       
        state.companyInfo = action.payload;              
        state.isSubmited=false;
        state.isLoading = false;
        state.success = true;   
       
    },       
    customerInfoCompanyFectchFailed : (state,action) =>  {       
        state.error = action.payload;       
        state.isSubmited=false;
        state.isLoading = false;
        state.success = false;  
    },                                     
    customerInfoDefaultCompany : (state,action) => {
        state.defautCompanyCode = action.payload;    
    }, 
    customerInfoStatesUpdate : (state,action) => {
        state.data.states = action.payload;    
    },  
    customerInfoSubscriptionUpdate : (state,action) => {        
        state.data.subscriptionInfo  = action.payload;             
    },
    customerInfoCompanyReset : (state) => {
        state.companyInfo  = customerInfo.companyInfo
        state.defautCompanyCode = customerInfo.defautCompanyCode;
    }

   },
   extraReducers : {},
});

export const selectCustomerInfoState = customerInfo => customerInfo.customer;
export const {
    customerInfoSateUpdate, 
    customerInfoSateNavsModuleUpdate , 
    customerInfoSateTabsModuleUpdate,
    customerInfoSateDefaultStatesUpdate,
    customerInfoSateOthersStatesUpdate,
    customerInfoSateSubscriptionUpdate,
    customerInfoSateLogoUpdate,
    customerInfoSateVoid,
    customerInfoSumbmit,
    customerInfoSucess,
    customerInfoFailed,
    customerInfoStatusReset,
    customerInfoCompanyFectchSubmit,
    customerInfoCompanyFectchSucess,
    customerInfoCompanyFectchFailed,
    customerInfoDefaultCompany,
    customerInfoStatesUpdate,
    customerInfoSubscriptionUpdate,
    customerInfoCompanyReset
} = customerInfoSlice.actions;

export default customerInfoSlice.reducer;