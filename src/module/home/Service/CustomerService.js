import {
  customerInfoCompanyFectchSubmit,customerInfoCompanyFectchSucess,customerInfoCompanyFectchFailed
} from "../Slice/CustomerSlice"
import {ServiceAPI}  from "../../httpclient"
import {HTTP,MESSAGE} from "../../common"

export const  fetchCompanyInfoForCustomer = (id,authState)=>  async dispatch => { 
      
  dispatch (customerInfoCompanyFectchSubmit(""))        
  try {
      
      const accessToken = authState.session.accessToken;
   
      ServiceAPI(accessToken).post("/usermgmt/getCompanyInfoById/"+id,{}).then((response) => {
          
          if(response.status===HTTP.CODE.OK){            
            dispatch(customerInfoCompanyFectchSucess(response.data))
                  
          }else{
            dispatch(customerInfoCompanyFectchFailed(MESSAGE.SERVICE_UNAVAILABLE))       
          } 
        }, (error) => {
          if(error.status===HTTP.CODE.UNAUTHORIZED){
            dispatch(customerInfoCompanyFectchFailed(MESSAGE.UNAUTHORIZED))
          }else{
             dispatch(customerInfoCompanyFectchFailed(MESSAGE.SERVICE_UNAVAILABLE))
           }
        });
     
  } catch (error) {
    console.error(error.response);        
    dispatch(customerInfoCompanyFectchFailed(MESSAGE.SERVICE_UNAVAILABLE));
  }   

}