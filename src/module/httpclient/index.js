import * as axios from  "axios";
import HTTPURL from "../common/AppsURLEnm";

const AuthAPI = (url,method,data) => {
     return axios.request({
            url,
            method,
            baseURL: HTTPURL.AUTH_URL,
            headers: {
                'Content-Type': 'form-data',
                'Authorization' : 'Basic ' + window.btoa("mobile" + ":" + "pin") 
            },
            data            
        }); 

}


const ServiceAPI = (token) => {
  return axios.create({
        baseURL: HTTPURL.API_URL,
        headers: {
            'Authorization': 'Bearer '+ token
        }
    });
}


export {AuthAPI,ServiceAPI}