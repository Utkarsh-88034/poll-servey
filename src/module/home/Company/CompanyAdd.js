import React from 'react'
import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CompanyBasicInfo from './CompanyBasicInfo';
import CompanyPrivilage from './CompanyPrivilage';
import CompanyProfileImage from './CompanyProfileImage';
import { selectMasterInfoState } from "../Slice/MasterSlice";
import { selectCompanyInfoState,
    companyInfoSateUpdate, 
    companyInfoSateNavsModuleUpdate , 
    companyInfoSateTabsModuleUpdate,
   
} from "../Slice/CompanySlice";
import { useSelector,useDispatch } from "react-redux";
import {CompanyInfo,SateInfo,ModuleInfo} from "../model";
import * as CompanyService from "../Service/CompanyService"
import {selectAuthState} from "../../login/LoginSlice"; 
import { useLocation } from 'react-router';
import queryString from 'query-string';


const CompanyAdd  = (props) => {    

    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    
    const masterInfoState = useSelector(selectMasterInfoState);
    const companyInfoState = useSelector(selectCompanyInfoState);
    const authState = useSelector(selectAuthState);
  
    const sateList = masterInfoState.data.stateList;      
    const modulesState = masterInfoState.data.modules;
  
    const {navs,tabs} = modulesState;
    const states = companyInfoState.data.states;  
    
    const location = useLocation();
  
    const [qparam]  = React.useState(queryString.parse(location.search));
    const {_usid} = qparam;

    
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  
    const nextTabHandler = () => {       
       setValue(value+1);
    }
  
    const previousTabHandler = () => {    
      setValue(value-1);
    }
  
   const finalSubmitHandler = () => {
  
      const companyInfo = {    
          "companyBasicInfo" : companyInfoState.data.companyBasicInfo,
          "geography" : {
              "states" : states
          },
          "modules" : reduceModulesData(companyInfoState.data.modules.navs,companyInfoState.data.modules.tabs),
          "logo" :  {
              "imageType" : "jpg",
              "imageValue" : companyInfoState.data.logo
          },
          "finance": {
            "subscriptionInfo": companyInfoState.data.finance.subscriptionInfo ,
          },
      }
     
      console.log(JSON.stringify(companyInfo));
      dispatch(CompanyService.saveCompanyInfo(authState,companyInfo));
      
   }
  
   
    React.useEffect(()=>{
    
    if(_usid){
      console.log(_usid)
    }else{
        console.log("No")
        
    }
    console.log(companyInfoState.data.companyBasicInfo);
    
    if(Object.keys(companyInfoState.data.companyBasicInfo).length === 0){
       dispatch(companyInfoSateUpdate(CompanyInfo.companyBasicInfo));    
    }
  
    if(Object.keys(companyInfoState.data.modules.navs).length === 0){
     dispatch(companyInfoSateNavsModuleUpdate(getModule(navs)));
     dispatch(companyInfoSateTabsModuleUpdate(getModule(tabs)));
    }
    
   },[]);
  
  
   
  
    return (
        <div>
        <Container maxWidth="lg" fixed >
            <AppBar position="static" color="transparent" >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"                
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="secondary"                  
                >
                    <Tab label="Personal"/>
                    <Tab label="Privilage" />
                    <Tab label="Image"/>                  
                </Tabs>
            </AppBar>
            {value === 0 && (
               <CompanyBasicInfo key={"cpersonal"} sateList={sateList} {...props} nextTabHandler={nextTabHandler} />  
            )}
            {value === 1 && (
               <CompanyPrivilage key={"cprivilege"}  sateList={sateList}  modulesState={modulesState} {...props} previousTabHandler={previousTabHandler} nextTabHandler={nextTabHandler}/>  
            )}
            {value === 2 && (
               <CompanyProfileImage key={"cprofileimage"}  sateList={sateList} {...props} previousTabHandler={previousTabHandler} nextTabHandler={nextTabHandler} finalSubmitHandler={finalSubmitHandler} qparam={qparam}/>  
            )}
            
         </Container>
      </div>
    )
  }
  
  function getModule(module){
     
     const keys = Object.keys(module); 
     const obj = {}; 
     keys.map(key => {      
         return(
             module[key].map(item => {  
                 return(
                     obj[item.moduleId] = item.isActive
                     
                 )             
                 
             })
         )
     });
     return obj;
  }
  
  function reduceModulesData(navs,tabs){
    const modulesArr = new Array(); 
    if(Object.keys(navs).length>0){
      const keys = Object.keys(navs);     
      keys.map(key => {
          modulesArr.push({"moduleId":  key, "isActive" : navs[key]})      
      });
    }
    if(Object.keys(tabs).length>0){
      const keys = Object.keys(tabs);     
      keys.map(key => {
          modulesArr.push({"moduleId":  key, "isActive" : tabs[key]})      
      });
    }
    return modulesArr;
  }
  function reduceStatesData(state,otherStates){
      const stateArr = new Array(); 
      if(state){
          stateArr.push({"stateCode":  state, "isDefault" : true})   
      }
     
      otherStates.map(value =>{
          stateArr.push({"stateCode":  value, "isDefault" : false})   
      });
  
      return stateArr;
  }

export default CompanyAdd
