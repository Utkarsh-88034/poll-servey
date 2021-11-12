import {createSlice} from "@reduxjs/toolkit"

const masterInfoState = {
    data : {
        stateList : [],
        modules : {
            navs: {

            },
            tabs : {

            }
        }, 
    },     
    isSubmited : false,   
    error : '',  
    isLoading : false,
    success : false,   
}
const masterInfoSlice = createSlice({
   name : "masterInfo",
   initialState : masterInfoState,
   reducers : {
    masterInfoSumbmit : state => { 
         state.data.stateList = masterInfoState.data.stateList;
         state.data.modules.navs = masterInfoState.data.modules.navs;
         state.data.modules.tabs = masterInfoState.data.modules.tabs;          
         state.isSubmited=true;
         state.error='';    
         state.isLoading = true; 
         state.success = false;      
     }, 
     masterInfoSucess : (state,action) => {        
         state.data.stateList = action.payload.data.states; 
         state.data.modules.navs = action.payload.data.modules.navs;
         state.data.modules.tabs = action.payload.data.modules.tabs;             
         state.isSubmited=false;
         state.error='';          
         state.isLoading = false; 
         state.success = true;                    
     },
     masterInfoFailed : (state,action) =>  {
         state.data.stateList = masterInfoState.data.stateList;         
         state.data.modules.navs = masterInfoState.data.modules.navs;
         state.data.modules.tabs = masterInfoState.data.modules.tabs;   
         state.error = action.payload;
         state.isSubmited=false;
         state.isLoading = false;
         state.success = false;    
     }
   },
   extraReducers : {},
});

export const selectMasterInfoState = masterInfo => masterInfo.master;
export const {masterInfoSumbmit, masterInfoSucess , masterInfoFailed} = masterInfoSlice.actions;

export default masterInfoSlice.reducer;