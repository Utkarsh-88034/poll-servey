import {loginSumbmit,loginSucess,loginFailed} from "./LoginSlice"; 
import {AuthAPI}  from "../httpclient"
import {Session} from "../model";
import {HTTP,MESSAGE} from "../common"


export const  login = ({username,password},history) => async dispatch => {    
      
      dispatch (loginSumbmit(""))        
      try {
        
        const bodyFormData = new FormData(); 
        bodyFormData.set("username", username);
        bodyFormData.set("password", password);
        bodyFormData.set("grant_type", "password");

        /*Session.accessToken = "123456-45678-1233"
        Session.refreshToken = "123456-45678-1233"
        dispatch(loginSucess({...Session})) 
        history.push("/home");*/
        
        AuthAPI("/oauth/token",HTTP.METHOD.POST,bodyFormData)
            .then((response) => {             
              if(response.status===HTTP.CODE.OK){
                Session.accessToken = response.data.access_token
                Session.refreshToken = response.data.refresh_token
                dispatch(loginSucess({...Session})) 
                history.push("/home");
              }else{
                dispatch(loginFailed(MESSAGE.SERVICE_UNAVAILABLE))       
              } 
            }, (error) => {
              if(error.status===HTTP.CODE.UNAUTHORIZED){
                dispatch(loginFailed(MESSAGE.UNAUTHORIZED))
              }else{
                 dispatch(loginFailed(MESSAGE.SERVICE_UNAVAILABLE))
               }
            });
         
      } catch (error) {
        console.error(error);        
        dispatch(loginFailed(MESSAGE.SERVICE_UNAVAILABLE));
      }     
  }