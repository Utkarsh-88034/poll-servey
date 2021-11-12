import {userInfoSumbmit, userInfoSucess , userInfoFailed,userInfoSateVoid} from "../Slice/UserSlice"
import {ServiceAPI}  from "../../httpclient"
import {HTTP,MESSAGE} from "../../common"


export const  saveUserInfo = (authState,userInfo) =>  async dispatch => {
      
    dispatch (userInfoSumbmit(""))        
    try {
        
        const accessToken = authState.session.accessToken;
     
        ServiceAPI(accessToken).post("/usermgmt/createUser",userInfo).then((response) => {
            console.log(response);
            if(response.status===HTTP.CODE.OK){            
              dispatch(userInfoSucess(response.data))
              dispatch(userInfoSateVoid()); 
              //history.push("/home");
            }else{
              dispatch(userInfoFailed(MESSAGE.SERVICE_UNAVAILABLE))       
            } 
          }, (error) => {
            if(error.status===HTTP.CODE.UNAUTHORIZED){
              dispatch(userInfoFailed(MESSAGE.UNAUTHORIZED))
            }else{
               dispatch(userInfoFailed(MESSAGE.SERVICE_UNAVAILABLE))
             }
          });
       
    } catch (error) {
      console.error(error);        
      dispatch(userInfoFailed(MESSAGE.SERVICE_UNAVAILABLE));
    }     
}

export const  fetchUsersInfo = (authState) => { 
      
    const accessToken = authState.session.accessToken;
  
    return ServiceAPI(accessToken).post("/usermgmt/getAllUsers",{}).then((response) => {        
        return response; 
      }, (error) => {
        return error.response; 
    });

}