import {masterInfoSumbmit, masterInfoSucess , masterInfoFailed} from "../Slice/MasterSlice"
import {profileInfoSumbmit, profileInfoSucess , profileInfoFailed} from "../Slice/ProfileSlice"
import {ServiceAPI}  from "../../httpclient"
import {MESSAGE} from "../../common"
import Axios from "axios";


export const  fetchBasicInfo = (authState) => dispatch => {    
      
    dispatch (masterInfoSumbmit("")) 
    dispatch (profileInfoSumbmit(""))        
    try {
      const accessToken = authState.session.accessToken;
      const refreshToken = authState.session.refreshToken;      
      
      Axios.all([
        ServiceAPI(accessToken).post("/api/v1/ms/getLoadingMasterInfo",{     
            "id" : "RML1",
            "masterRequestType" : "GET_LOADING_INFO",
            "statusType" : "ACTIVE",
        }),
        ServiceAPI(accessToken).post("/usermgmt/getLoggedInUser",{})         
      ]).then(Axios.spread((masterResponse, profileResponse) => {         
           dispatch(masterInfoSucess(masterResponse.data))  
           dispatch(profileInfoSucess(profileResponse.data))        
      })).catch(error => {
        console.log(error);
        dispatch(masterInfoFailed(MESSAGE.SERVICE_UNAVAILABLE))  
        dispatch(profileInfoFailed(MESSAGE.SERVICE_UNAVAILABLE)) 
      });
     
     } catch (error) {
        console.error(error);        
        dispatch(masterInfoFailed(MESSAGE.SERVICE_UNAVAILABLE))  
        dispatch(profileInfoFailed(MESSAGE.SERVICE_UNAVAILABLE)) 
    }      
      
}