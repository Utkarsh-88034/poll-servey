import {companyInfoSumbmit, companyInfoSucess , companyInfoFailed,companyInfoSateVoid,
  companyInfoStatusSummerySubmit,companyInfoStatusSummerySucess,companyInfoStatusSummeryFailed,
  companyInfoFectchSubmit,companyInfoFectchSucess,companyInfoFectchFailed
} from "../Slice/CompanySlice"
import {ServiceAPI}  from "../../httpclient"
import {HTTP,MESSAGE} from "../../common"


export const  saveCompanyInfo = (authState,companyInfo) =>  async dispatch => {
      
    dispatch (companyInfoSumbmit(""))        
    try {
        
        const accessToken = authState.session.accessToken;
     
        ServiceAPI(accessToken).post("/usermgmt/createCompany",companyInfo).then((response) => {
            
            if(response.status===HTTP.CODE.OK){            
              dispatch(companyInfoSucess(response.data))
              dispatch(companyInfoSateVoid());             
            }else{
              dispatch(companyInfoFailed(MESSAGE.SERVICE_UNAVAILABLE))       
            } 
          }, (error) => {
            if(error.status===HTTP.CODE.UNAUTHORIZED){
              dispatch(companyInfoFailed(MESSAGE.UNAUTHORIZED))
            }else{
               dispatch(companyInfoFailed(MESSAGE.SERVICE_UNAVAILABLE))
             }
          });
       
    } catch (error) {
      console.error(error.response);        
      dispatch(companyInfoFailed(MESSAGE.SERVICE_UNAVAILABLE));
    }     
}

export const  fetchcompanysInfo = (authState) => { 
      
    const accessToken = authState.session.accessToken;
  
    return ServiceAPI(accessToken).post("/companymgmt/getAllcompanys",{}).then((response) => {        
        return response; 
      }, (error) => {
        return error.response; 
    });

}

export const  fetchcompanySummeryServiceList = (authState) =>  async dispatch => {
 
  
  dispatch (companyInfoStatusSummerySubmit(""))        
  try {
      
      const accessToken = authState.session.accessToken;
   
      ServiceAPI(accessToken).post("/usermgmt/getAllCompanySummaryInfo",{}).then((response) => {
          
          if(response.status===HTTP.CODE.OK){            
           
            dispatch(companyInfoStatusSummerySucess(response.data.companySummaryInfoList))
                    
          }else{
           
            dispatch(companyInfoStatusSummeryFailed(MESSAGE.SERVICE_UNAVAILABLE))       
          } 
        }, (error) => {
          if(error.status===HTTP.CODE.UNAUTHORIZED){
           
            dispatch(companyInfoStatusSummeryFailed(MESSAGE.UNAUTHORIZED))
          }else{
            
             dispatch(companyInfoStatusSummeryFailed(MESSAGE.SERVICE_UNAVAILABLE))
           }
        });
     
  } catch (error) {
    console.error(error.response);        
    dispatch(companyInfoStatusSummeryFailed(MESSAGE.SERVICE_UNAVAILABLE));
  }     
}

