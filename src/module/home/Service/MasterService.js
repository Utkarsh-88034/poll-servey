import {masterInfoSumbmit, masterInfoSucess , masterInfoFailed} from "../Slice/MasterSlice"
import {ServiceAPI}  from "../../httpclient"
import {HTTP,MESSAGE} from "../../common"



export const  fetchMasterInfo = (authState)= dispatch => {    
      
    dispatch (masterInfoSumbmit(""))        
    try {
      const accessToken = authState.session.accessToken;
      const refreshToken = authState.session.refreshToken;    
      
      ServiceAPI(accessToken).post("/api/v1/ms/getallstates",{     
            "id" : "RMS1",
            "masterRequestType" : "GET_STATE_LIST",
            "statusType" : "ALL",
        }).then((response) => {
            console.log(response);
            if(response.status===HTTP.CODE.OK){
              dispatch(masterInfoSucess(response.data))              
            }else{
              dispatch(masterInfoFailed(MESSAGE.SERVICE_UNAVAILABLE))       
            } 
          }, (error) => {
            if(error.status===HTTP.CODE.UNAUTHORIZED){
              dispatch(masterInfoFailed(MESSAGE.UNAUTHORIZED))
            }else{
               dispatch(masterInfoFailed(MESSAGE.SERVICE_UNAVAILABLE))
             }
          });
       
    } catch (error) {
      console.error(error);        
      dispatch(masterInfoFailed(MESSAGE.SERVICE_UNAVAILABLE));
    }     
}