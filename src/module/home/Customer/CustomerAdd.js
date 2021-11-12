import React from 'react'
import { Container,AppBar,Tabs,Tab,FormHelperText,Paper,
    MenuItem,FormControl,InputLabel,Select,Divider,Typography,Grid, CircularProgress } from '@material-ui/core';
import CustomerBasicInfo from './CustomerBasicInfo'
import * as CompanyService from "../Service/CompanyService"
import * as CustomerService from "../Service/CustomerService"
import {selectAuthState} from "../../login/LoginSlice"; 
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { useSelector,useDispatch } from "react-redux";
import { selectCompanyInfoState
} from "../Slice/CompanySlice";
import { selectCustomerInfoState,customerInfoDefaultCompany,customerInfoCompanyReset
} from "../Slice/CustomerSlice";
import { selectMasterInfoState } from "../Slice/MasterSlice";
import CustomerInfo from "../model/CustomerInfo"
import * as lodash from 'lodash'; 
import CustomerPrivilage from "./CustomerPrivilage"

const CustomerAdd = (props) => {    

    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const authState = useSelector(selectAuthState);
    const masterInfoState = useSelector(selectMasterInfoState);
    const companyInfoState = useSelector(selectCompanyInfoState);
    const customerInfoState = useSelector(selectCustomerInfoState);
    const [subscriptionInfo,setSubscriptionInfo] = React.useState();
    const [modulesState,setModulesState] = React.useState();
    const [operationStateList,setOperationStateList] = React.useState();
    

    const sateList = masterInfoState.data.stateList;      
   

    let customerbasicInfo = {};
    const isUpdate =   Object.keys(customerInfoState.data.basicInfo).length;   
    const isNew  =  Object.keys(customerInfoState.companyInfo.companyBasicInfo).length;;
   
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  
    const nextTabHandler = () => {       
       setValue(value+1);
    }
  
    const previousTabHandler = () => {    
      setValue(value-1);
    }

    const handleChangeForCompanyObj = (event) =>{    
        dispatch(customerInfoCompanyReset(""));
        dispatch(customerInfoDefaultCompany(event.target.value));
        dispatch(CustomerService.fetchCompanyInfoForCustomer(event.target.value,authState));
        
    }
  

    React.useEffect(()=>{
        dispatch(CompanyService.fetchcompanySummeryServiceList(authState));       
    },[])

    React.useMemo(()=>{       
        if(isUpdate==0){
            customerbasicInfo  = CustomerInfo.basicInfo
            setSubscriptionInfo(customerInfoState.companyInfo.finance.subscriptionInfo);
            setModulesState(customerInfoState.companyInfo.moduleMappingInfo);
            setOperationStateList(prepareStateList(masterInfoState.data.stateList,customerInfoState.companyInfo.geography.states,[]));
           
        } else{
            customerbasicInfo = customerInfoState.data.basicInfo;
            setSubscriptionInfo(subscriptionInfo = customerInfoState.data.subscriptionInfo);
            setModulesState(customerInfoState.data.moduleMappingInfo);
            
        }
     
        
    },[isUpdate,isNew])
   
    
  
    return (
        <div>
        <Container fixed >
            <Paper style={{ padding: 10 }}  elevation={2}  >        

                <Grid item xs={4}>
                       <FormControl required fullWidth  >
                       <InputLabel id="company-name-select-label">Select Company</InputLabel>
                            <Select
                                labelId="company-name-mutiple-label"
                                id="company-name"
                                value={customerInfoState.defautCompanyCode || ''}
                                onChange={handleChangeForCompanyObj}
                                fullWidth
                                name="companyCode" 
                                color="primary"
                            >
                            
                                
                            {
                                companyInfoState.companySummaryInfoList.map(({ companyId, companyName }) => (
                                    <MenuItem  color="primary" key={companyId} value={companyId}>{companyName}</MenuItem>
                                ))
                            }

                            </Select>  
                            <FormHelperText></FormHelperText>           
                         </FormControl>     
                </Grid>                
            </Paper>  
            <br/>
            
            {
               
               Object.keys(customerInfoState.companyInfo.companyBasicInfo).length>0 ? 
               (
                        <React.Fragment>
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
                    <CustomerBasicInfo key={"custpersonal"} customerbasicInfo={customerbasicInfo} sateList={sateList} {...props} />  
                    )}
                     {value === 1 && (
                    <CustomerPrivilage key={"custprivilage"} subscriptionInfo={subscriptionInfo} modulesState={modulesState} stateList={operationStateList} {...props} nextTabHandler={nextTabHandler} previousTabHandler={previousTabHandler} />  
                    )}
                    </React.Fragment>
               )                
                
               : customerInfoState.isSubmited===true ? <CircularProgress /> 
                    : customerInfoState.error !== '' ? customerInfoState.error : null
                
 
            }

            
           
            
         </Container>
      </div>
    )
  }
  
function prepareStateList(stateList,companyStateList,customerList){
 
  const statesCodeObj =   lodash.keyBy(stateList,"stateCode");
  const companyStatesCodeObj =  lodash.keyBy(companyStateList,"stateCode");
  const customerStatesCodeObj =  lodash.keyBy(customerList,"stateCode");
  const finalStateList = new Array();  
  Object.keys(companyStatesCodeObj).map(key=>{
      
     const customerStateCodeObj = customerStatesCodeObj[key];  
     const stateCodeObj = statesCodeObj[key];
     const companyStateCodeObj = companyStatesCodeObj[key]; 
     
     if(customerStateCodeObj===undefined){
        finalStateList.push({ 
            ...companyStateCodeObj,
            "isSelected " : false,
            "stateName" : stateCodeObj.stateName
        })
     }else{
        finalStateList.push({ 
            ...companyStateCodeObj,
            ...customerStateCodeObj,
            "isSelected " : true,
            "stateName" : stateCodeObj.stateName
        })
     }
    
  })
  
  return finalStateList;

}   

export default CustomerAdd
