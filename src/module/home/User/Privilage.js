import React from 'react'
import {
    Paper, Grid,
    Typography, Button, 
    FormControlLabel, Divider, FormGroup, Checkbox,
    MenuItem, ListItemText, Select, InputLabel, Input
} from '@material-ui/core';
import * as Yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import { 
    selectUserInfoState,
    userInfoSateNavsModuleUpdate , 
    userInfoSateTabsModuleUpdate,
    userInfoSateDefaultStatesUpdate,
    userInfoSateOthersStatesUpdate,

   
} from "../Slice/UserSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
}


const Privilage = ({classes,sateList,modulesState,nextTabHandler,previousTabHandler}) => {

   
    const dispatch = useDispatch();
    const userInfoState = useSelector(selectUserInfoState);

    const {navs,tabs} = userInfoState.data.modules;
    const defaultState = userInfoState.data.defaultState;
    const othersStates = userInfoState.data.othersStates;


    const [stateDefaultCodeObj, setStateDefaultCodeObj] = React.useState(defaultState);
    const [stateOthersCodeObj, setStateOthersCodeObj] = React.useState(othersStates);
    const [tabsState,setTabsState] = React.useState(tabs);
    const [navsState,setNavsState] = React.useState(navs);    

    const handleChangeForDefaultState = (event) => {       
        setStateDefaultCodeObj(event.target.value); 
        setStateOthersCodeObj([]);       
        
    };

    const handleChangeForOtherState = (event) => {      
        setStateOthersCodeObj(event.target.value);
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
        dispatch(userInfoSateNavsModuleUpdate(navsState));
        dispatch(userInfoSateTabsModuleUpdate(tabsState));  
        dispatch(userInfoSateDefaultStatesUpdate(stateDefaultCodeObj));
        dispatch(userInfoSateOthersStatesUpdate(stateOthersCodeObj)); 
    }
 
    return (
        <div>
            <Paper style={{ padding: 16 }} variant="outlined" square  >
                <Grid container spacing={1} direction="row" justify="space-around" alignItems="flex-start">
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
                        <InputLabel id="user-default-mutiple-checkbox-label">Select Default State</InputLabel>
                        <Select
                            labelId="user-default-mutiple-checkbox-label"
                            id="user-default-mutiple-checkbox"
                            value={stateDefaultCodeObj}
                            onChange={handleChangeForDefaultState}
                            fullWidth
                            MenuProps={MenuProps}
                        >
                           
                            
                            {
                                sateList.map(({ stateCode, stateName }) => (
                                    <MenuItem key={stateCode} value={stateCode}>{stateName}</MenuItem>
                                ))
                            }

                        </Select>

                    </Grid>

                    <Grid item xs={6}>
                        <InputLabel id="user-other-mutiple-checkbox-label">Select Other's State</InputLabel>
                        <Select
                            labelId="user-other-mutiple-checkbox-label"
                            id="user-other-mutiple-checkbox"
                            multiple
                            value={stateOthersCodeObj}
                            onChange={handleChangeForOtherState}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            fullWidth
                            MenuProps={MenuProps}
                        >
                       
                            {
                                
                                sateList.filter(obj=>obj.stateCode!==stateDefaultCodeObj).map(({ stateCode, stateName }) => (
                                    <MenuItem key={stateCode} value={stateCode}>
                                        <Checkbox  color="primary" checked={stateOthersCodeObj.indexOf(stateCode) > -1} />
                                        <ListItemText primary={stateName} />                                      
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>

                    <Grid item xs={12} >              
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
                                    value={item.moduleId} 
                                    onChange={(event)=>{tabHandleChange(event)}}  
                                    color="primary"
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


export default Privilage;
