import React from 'react'
import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Personal from './Personal';
import Privilage from './Privilage';
import ProfileImage from './ProfileImage';
import { selectMasterInfoState } from "../Slice/MasterSlice";
import { selectUserInfoState,
    userInfoSateUpdate, 
    userInfoSateNavsModuleUpdate , 
    userInfoSateTabsModuleUpdate,
   
} from "../Slice/UserSlice";
import { useSelector,useDispatch } from "react-redux";
import {UserInfo,SateInfo,ModuleInfo} from "../model";
import * as UserService from "../Service/UserService"
import {selectAuthState} from "../../login/LoginSlice"; 
import { useLocation } from 'react-router';
import queryString from 'query-string';

const UserAdd = (props) => {    

  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  
  const masterInfoState = useSelector(selectMasterInfoState);
  const userInfoState = useSelector(selectUserInfoState);
  const authState = useSelector(selectAuthState);

  const sateList = masterInfoState.data.stateList;      
  const modulesState = masterInfoState.data.modules;

  const {navs,tabs} = modulesState;

  
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

    const userInfo = {
        "managerId" : "1",
        "basicInfo" : userInfoState.data.basicInfo,
        "geography" : {
            "states" : reduceStatesData(userInfoState.data.defaultState,userInfoState.data.othersStates)
        },
        "modules" : reduceModulesData(userInfoState.data.modules.navs,userInfoState.data.modules.tabs),
        "subscriptionInfo" : userInfoState.data.subscriptionInfo,
        "logo" :  {
            "imageType" : "jpg",
            "imageValue" : userInfoState.data.logo
        },
    }
   
    console.log(JSON.stringify(userInfo));
    dispatch(UserService.saveUserInfo(authState,userInfo));
    
 }

 

 React.useEffect(()=>{
  
  if(_usid){
    console.log(_usid)
  }else{
      console.log("No")
  }
  
  
  if(Object.keys(userInfoState.data.basicInfo).length === 0){
     dispatch(userInfoSateUpdate(UserInfo.basicInfo));    
  }

  if(Object.keys(userInfoState.data.modules.navs).length === 0){
   dispatch(userInfoSateNavsModuleUpdate(getModule(navs)));
   dispatch(userInfoSateTabsModuleUpdate(getModule(tabs)));
  }
  
 },[]);


 

  return (
      <div>
      <Container  fixed >
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
             <Personal key={"upersonal"} sateList={sateList} {...props} nextTabHandler={nextTabHandler} />  
          )}
          {value === 1 && (
             <Privilage key={"uprivilege"}  sateList={sateList}  modulesState={modulesState} {...props} previousTabHandler={previousTabHandler} nextTabHandler={nextTabHandler}/>  
          )}
          {value === 2 && (
             <ProfileImage key={"uprofileimage"}  sateList={sateList} {...props} previousTabHandler={previousTabHandler} nextTabHandler={nextTabHandler} finalSubmitHandler={finalSubmitHandler} qparam={qparam}/>  
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

export default UserAdd
