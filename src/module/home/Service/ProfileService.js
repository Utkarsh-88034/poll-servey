import {profileInfoSumbmit, profileInfoSucess , profileInfoFailed} from "../Slice/ProfileSlice"
import {ServiceAPI}  from "../../httpclient"
import {HTTP,MESSAGE} from "../../common"


export const  fetchProfileInfo = (authState) = dispatch =>{
      
    dispatch (profileInfoSumbmit(""))        
    try {
        const accessToken = authState.session.accessToken;
        const refreshToken = authState.session.refreshToken;
     
        ServiceAPI(accessToken).post("/getLoggedInUser",{}).then((response) => {
            console.log(response);
            if(response.status===HTTP.CODE.OK){            
              dispatch(profileInfoSucess(response.data)) 
              history.push("/home");
            }else{
              dispatch(profileInfoFailed(MESSAGE.SERVICE_UNAVAILABLE))       
            } 
          }, (error) => {
            if(error.status===HTTP.CODE.UNAUTHORIZED){
              dispatch(profileInfoFailed(MESSAGE.UNAUTHORIZED))
            }else{
               dispatch(profileInfoFailed(MESSAGE.SERVICE_UNAVAILABLE))
             }
          });
       
    } catch (error) {
      console.error(error);        
      dispatch(profileInfoFailed(MESSAGE.SERVICE_UNAVAILABLE));
    }     
}