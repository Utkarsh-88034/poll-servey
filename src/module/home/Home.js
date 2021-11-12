import React, {useEffect} from 'react'
import SideNavBar from './Layout/Sidebar/SideNavBar';
import Appbar from "./Layout/Topbar/Appbar"
import Main from './Layout/Main/Main';
import {CssBaseline,Grid,CircularProgress,Button} from '@material-ui/core';
import * as BasicService from "./Service/BasicLoadingService"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useSelector,useDispatch} from "react-redux";
import {selectAuthState} from "../login/LoginSlice"; 
import {selectMasterInfoState} from "./Slice/MasterSlice";
import {selectProfileInfoState} from "./Slice/ProfileSlice";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,      
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',      
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    grow : {
      flexGrow: 1,
    },
    whiteColor: {
      color: "white"
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    item: {
      marginLeft : 1,
      marginRight :1
    },
    marginRight: {
      marginRight: theme.spacing(5),
    },
    marginTop: {
      marginTop: theme.spacing(1),
    },
    marginTop2: {
      marginTop: theme.spacing(2),
    },
    
  }));
 

const Home = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    
    const dispatch = useDispatch();
    const authState = useSelector(selectAuthState);
    const profileInfoState = useSelector(selectProfileInfoState);
    const masterInfoState = useSelector(selectMasterInfoState);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    console.log("Home");
    

    useEffect(() => {     
      dispatch(BasicService.fetchBasicInfo(authState))    
    }, [])
  
 
  return (
   
    <div className={classes.root}>
      
      {
         (masterInfoState.isSubmited===true || profileInfoState.isSubmited===true) ?  (
            <Grid container direction="column"
            justify="center"
            alignItems="center"  style={{ minHeight: '100vh' }}>
              <CircularProgress />
            </Grid>
        )      
        :
        
          
            (masterInfoState.error!=='' || profileInfoState.error !=='') ? (
              <Grid container direction="column"
              justify="center"
              alignItems="center"  style={{ minHeight: '100vh' }}>
                 <Button variant="outlined" size="medium" color="primary" className={classes.margin} onClick={()=>window.location.reload()}>
                   Retry
                </Button>
              </Grid>
            ) : (
              <>
              <CssBaseline />
              <Appbar key="Appbar" classes={classes} handleDrawerOpen={handleDrawerOpen} open={open} theme={theme}/>
              <SideNavBar key="SideNavBar" classes={classes} handleDrawerClose={handleDrawerClose} open={open} theme={theme}/>
              <Main  key="mainContentArea"  classes={classes} open={open} />
              </>
            )
      }
      </div>
     
    )
}

export default Home;
