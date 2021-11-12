import React from 'react'
import {
    Paper, Grid,
    Typography, Button, 
    FormControlLabel, Divider, FormGroup, Checkbox,
    MenuItem, ListItemText, Select, InputLabel, Input,
    Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Switch ,
    Radio,IconButton
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import format from 'date-fns/format'
import * as Yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import { 
    selectCustomerInfoState,
    customerInfoSateNavsModuleUpdate , 
    customerInfoSateTabsModuleUpdate,
    customerInfoStatesUpdate,
    customerInfoSubscriptionUpdate,
   
} from "../Slice/CustomerSlice";
import {   
    DatePicker,KeyboardDatePicker
  } from '@material-ui/pickers';
import * as lodash from 'lodash';  
import { indigo } from '@material-ui/core/colors';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
}

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

  

const CustomerOperationsPrivilage = ({classes,stateList,modulesState,subscriptionInfo,nextTabHandler,previousTabHandler}) => {

      
    const dispatch = useDispatch();
    const customerInfoState = useSelector(selectCustomerInfoState);
    const localClass = useStyles();  

    const {navs,tabs} = customerInfoState.data.modules;
    const states = customerInfoState.data.states;   
    
   
   
    const [stateOthersCodeObj, setStateOthersCodeObj] = React.useState([]);
    const [tabsState,setTabsState] = React.useState(tabs);
    const [navsState,setNavsState] = React.useState(navs); 
    const [statesMapState,setStatesMapState] = React.useState({});
  


    const [defaultSateCode,setDefaultSateCode] = React.useState(customerInfoState.defautSateCode); 
    
    const [csubsStartDate, setCSubsStartDate] = React.useState(subscriptionInfo.subsStartDate);
    const [csubsEndDate, setCSubsEndDate] = React.useState(subscriptionInfo.subsEndDate);

    const [subsStartDate, setSubsStartDate] = React.useState(csubsStartDate);
    const [subsEndDate, setSubsEndDate] = React.useState(csubsEndDate);    

    const handleChangeForOtherState = (event,value) => {   
        event.preventDefault();
        setStateOthersCodeObj(value);        
    };     

    const tabHandleChange = (event) =>{       
        setTabsState({...tabsState,[event.target.value] : event.target.checked })
    }

    const navHandleChange = (event) =>{       
        setNavsState({...navsState,[event.target.value] : event.target.checked })
    }

    const nextTab = () => {
        updateTabState();
        nextTabHandler();
    }
    const previousTab = () => {
        updateTabState();
        previousTabHandler();
    } 
    
    const updateTabState = () => {
        const subsDate = { 
            "subsStartDate" : csubsStartDate, 
            "subsEndDate" : csubsEndDate 
        };
        dispatch(customerInfoSateNavsModuleUpdate(navsState));
        dispatch(customerInfoSateTabsModuleUpdate(tabsState));
        dispatch(customerInfoStatesUpdate(Object.values(statesMapState)));               
        dispatch(customerInfoSubscriptionUpdate(subsDate));
    }  
   

    const generateSates = () =>{
      

        if(stateOthersCodeObj.length === 0 ){
            setStatesMapState({});
            return;
        }
        
        let stateMap = {};
        const statesMapStateKey = Object.keys(statesMapState);        
        let statesLength  = statesMapStateKey.length;
        if(statesLength === 0){
            stateMap = lodash.keyBy(states,"stateCode");
            statesLength = Object.keys(stateMap).length;
        }else {
            stateMap = statesMapState;
        }
        
        const isDefaultPresent = stateOthersCodeObj.includes(defaultSateCode);
        let defaultSateCodeTmp = "";

        if(stateOthersCodeObj.length>statesLength){
            const stateCodeList = lodash.difference(stateOthersCodeObj,statesMapStateKey);

            const sobj = {}
            const stateMapTmp = stateCodeList.map((obj,index) =>{  
                defaultSateCodeTmp = isDefaultPresent===false && index===0 ? obj : defaultSateCode
           
                sobj[obj] = {
                    "stateCode" : obj,
                    "isDefault" : isDefaultPresent===false ? index===0 ? true : false : obj === defaultSateCode ? true  : false,
                    "stateSubsInfo":{
                        "subsStartDate": subsStartDate,
                        "subsEndDate": subsEndDate
                     },
                     "isActive":true,
                   }
                 
            })  
            stateMap = {...stateMap,...sobj}
            setDefaultSateCode(defaultSateCodeTmp);
            setStatesMapState(stateMap);

        }else if (stateOthersCodeObj.length<=statesLength){
            const stateCodeList = Object.keys(stateMap);            
            const sobj = {}
           stateCodeList.filter(obj=>stateOthersCodeObj.includes(obj)).map((obj,index) =>{ 
                const data = stateMap[obj]; 
                if(isDefaultPresent === false && index===0){                   
                    defaultSateCodeTmp = data.stateCode;
                    sobj[data.stateCode] =  {...data,"isDefault": true };
                }else{
                    if(data.isDefault){
                        defaultSateCodeTmp = data.stateCode;
                    }
                    sobj[data.stateCode] = {...data,"isDefault": data.isDefault };
                } 
               
           })
         
           setStatesMapState(sobj);     
           setDefaultSateCode(defaultSateCodeTmp);       
                  
        }            
    }  

    const  changeDefaultState = (ind,stateCode) =>{
        const statesMapStateKey = Object.keys(statesMapState);
        const sobj = {}
        statesMapStateKey.map(key=>{
            const obj = statesMapState[key];
            if(obj.stateCode === stateCode){             
                sobj[obj.stateCode] =  {...obj,"isDefault": true };
            }else{
                sobj[obj.stateCode] =  {...obj,"isDefault": false };
            }
         })
        setStatesMapState(sobj);
        setDefaultSateCode(stateCode);
    }

    const changeActiveState = (ind,stateCode) =>{
        const statesMapStateKey = Object.keys(statesMapState);
        const sobj = {}
        statesMapStateKey.map(key=>{
            const obj = statesMapState[key];
            if(obj.stateCode === stateCode){             
                sobj[obj.stateCode] =  {...obj,"isActive": !obj.isActive };
            }else{
                sobj[obj.stateCode] =  {...obj };
            }
         })
        setStatesMapState(sobj);       
    }

    const removeState = (stateCode) =>{
        if(stateCode===defaultSateCode){
            setDefaultSateCode("");           
        }
        const statesObj = stateOthersCodeObj.filter(obj=>obj!==stateCode).map(obj=>{            
            return obj;
        });
        
        setStateOthersCodeObj(statesObj);  
    }
   
    React.useMemo(()=>{        
        generateSates();       
    },[stateOthersCodeObj.length])
  

    React.useEffect(()=>{        
        const statesObj = new Array();
        states.map((row,index) => {
            statesObj.push(row.stateCode);
            if(row.isDefault){
                setDefaultSateCode(row.stateCode);
            }                   
        });
        
        setStateOthersCodeObj(statesObj);   
      
    },[]);

    console.log(modulesState)
 
    return (
        <div>
            <Paper style={{ padding: 16 }} variant="outlined" square  >
                <Grid container spacing={1} direction="row" justify="space-around" alignItems="flex-start">
                <Grid item xs={12} >
                        <Typography variant="h6" component="h6" align="left">
                            Subscription Management :
                        </Typography>
                        <Divider />
                        <Divider />
                    </Grid>                    
                    <Grid item xs={4} >
                        <KeyboardDatePicker          
                            variant="inline"
                            format="yyyy-MM-dd"
                            margin="normal"                            
                            id="comp-sub-start-date"
                            label="Subscription Start Date"
                            fullWidth
                            value={csubsStartDate}                            
                            onChange={setCSubsStartDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                                
                            }}
                            minDate = {subscriptionInfo.subsStartDate}
                            maxDate={subscriptionInfo.subsEndDate}
                            autoOk={true}
                            
                        />
                    </Grid>                   
                    <Grid item xs={4} >
                        <KeyboardDatePicker          
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"                               
                                id="comp-sub-end-date"
                                label="Subscription End Date"
                                fullWidth
                                value={csubsEndDate}
                                onChange={setCSubsEndDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }} 
                                maxDate={subscriptionInfo.subsEndDate}  
                                autoOk={true}
                                                     
                            />
                    </Grid>
                    <Grid item xs={4} >                        
                    </Grid>      
               
                    <Grid item xs={12} >
                        <Typography variant="h6" component="h6" align="left">
                            Module Management :
                        </Typography>
                        <Divider />
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup row>
                            <NavPrivilegeItem navs={modulesState.navs} navsState={navsState} classes={classes} navHandleChange={navHandleChange}/>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="h6" component="h6" align="left">
                            Tab Management :
                            </Typography>
                        <Divider />
                        <Divider />
                    </Grid>
                    <Grid item xs={8} >
                        <Typography align="left">
                            Name
                            </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={2} >
                        <Typography>
                            Read
                            </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={2} >
                        <Typography>
                            Write
                            </Typography>
                        <Divider />
                    </Grid>
                     
                     <TabPrivilegeItem tabs={modulesState.tabs} tabsState={tabsState} classes={classes} tabHandleChange={tabHandleChange}/>
                    
                    <Grid item xs={12} >
                        <Typography variant="h6" component="h6" align="left">
                            State Management :
                        </Typography>
                        <Divider />
                        <Divider />
                    </Grid>
                   

                    <Grid item xs={6}>
                        <InputLabel className={classes.marginTop2} id="customer-other-mutiple-checkbox-label">Select Other's State</InputLabel>
                        <Select
                            labelId="customer-other-mutiple-checkbox-label"
                            id="customer-other-mutiple-checkbox"
                            multiple
                            value={stateOthersCodeObj}
                            onChange={(event)=>handleChangeForOtherState(event,event.target.value)}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            fullWidth
                            MenuProps={MenuProps}
                           
                        >
                            
                            {
                                
                                stateList.map(({ stateCode, stateName }) => (
                                    <MenuItem key={stateCode} value={stateCode}>
                                        <Checkbox checked={stateOthersCodeObj.indexOf(stateCode) > -1} color="primary" />
                                        <ListItemText primary={stateName}  />                                      
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>

                    
                    <Grid item xs={3} >
                        <KeyboardDatePicker          
                            variant="inline"
                            format="yyyy-MM-dd"
                            margin="normal"                           
                            id="cust-sub-start-date"
                            label="Subscription Start Date"
                            value={subsStartDate}
                            onChange={setSubsStartDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            minDate={csubsStartDate}
                            maxDate={csubsEndDate}
                        />
                    </Grid>
                    <Grid item xs={3} >
                        <KeyboardDatePicker          
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"                                
                                id="cust-sub-end-date"
                                label="Subscription End Date"
                                value={subsEndDate}
                                onChange={setSubsEndDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                minDate={csubsStartDate}
                                maxDate={csubsEndDate}
                            />
                    </Grid>

                    <Grid item xs={12} >              
                        <TableContainer component={Paper}>   
                            <SatesSubsription states={statesMapState} localClass={localClass} changeDefaultState={changeDefaultState} removeState={removeState} changeActiveState={changeActiveState} />
                        </TableContainer>                    
                    </Grid>

                    <Grid item xs={12} align="right" >                                                                
                        <Button variant="contained" color="primary" className={classes.menuButton} size="medium" onClick={previousTab} >Previous</Button>   
                        <Button variant="contained" size="medium" color="primary" onClick={nextTab} >Next</Button>   
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

const NavPrivilegeItem = ({navs,navsState,classes,navHandleChange}) => {        
     const keys = Object.keys(navs);      
      return (
          keys.map(key => {
            return(  
             navs[key].map(item => {                                 
                return(
                    <FormControlLabel key={item.moduleCode} className={classes.marginRight}
                    control={
                        <Checkbox
                            checked={navsState[item.moduleId] || false}
                            name={key}
                            color="primary"                                                                           
                            value={item.moduleId}                          
                            onChange={(event)=>{navHandleChange(event)}}   
                        />
                    }
                    label={key}
                />   
               )
        
            })
          )                       
        })
      )   
}

const TabPrivilegeItem = ({tabs,tabsState,classes,tabHandleChange}) => {        
    const keys = Object.keys(tabs);  
    
     return (
         keys.map(key => {
           return( 
            <React.Fragment key={key}>   
                <Grid item xs={8} >
                    <Typography align="left" className={classes.marginTop}>
                        {key}
                    </Typography>
                </Grid>
               
             { 
                
                tabs[key].map(item => {                                 
                return(
                    <Grid item xs={2} key={item.moduleCode}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={tabsState[item.moduleId] || false}
                                    name={key}
                                    color="primary"
                                    value={item.moduleId} 
                                    onChange={(event)=>{tabHandleChange(event)}}    
                                />
                            }
                        />
                    </Grid>
                )
                })
            }  
         </React.Fragment> 
         )                       
       })
     )   
}

const SatesSubsription = ({states,localClass,changeDefaultState,removeState,changeActiveState}) =>{
    const statesList = Object.values(states);
    if(statesList.length===0){
        return null;
    }    
    return (
        <TableContainer component={Paper} className={localClass.container}>
        <Table size="small" >
          <TableHead>
            <TableRow>
              <TableCell align="center" ><b>State</b></TableCell>
              <TableCell align="center"><b>Subs. Start Date</b></TableCell>
              <TableCell align="center"><b>Subs. End Date</b></TableCell>
              <TableCell align="center"><b>Deafult</b></TableCell>
              <TableCell align="center"><b>(In)Active</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
              
         { statesList.map((row,index) => {
                    return(
                        <TableRow key={row.stateCode}>                
                        <TableCell align="center">{row.stateCode}</TableCell>
                        <TableCell align="center">{row.stateSubsInfo.subsStartDate}</TableCell>
                        <TableCell align="center">{row.stateSubsInfo.subsEndDate}</TableCell>
                        <TableCell align="center">
                                <Radio                           
                                    checked={row.isDefault}
                                    onChange={()=>changeDefaultState(index,row.stateCode)}
                                    value={row.stateCode}
                                    name="com-state-default"
                                    inputProps={{ 'aria-label': 'A' }}  
                                    color="primary"
                                    />
                        </TableCell>
                        <TableCell align="center">
                            <FormControlLabel
                                control={<Switch checked={row.isActive}  name="comp-active-state" onChange={()=>changeActiveState(index,row.stateCode)} color="primary"  />}
                                label="" 
                            />
                        </TableCell>
                        <TableCell align="center">
                            <IconButton onClick={()=>removeState(row.stateCode)}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                       
                    </TableRow>
                    ) 
                })            
           
            }
          </TableBody>
        </Table>
      </TableContainer>
    )
} 


export default CustomerOperationsPrivilage;
