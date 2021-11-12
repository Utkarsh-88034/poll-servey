import React from 'react'
import {
    Paper, Grid, 
    Typography, Button, 
     Divider, Avatar,CircularProgress,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions
     
} from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import { selectUserInfoState,userInfoStatusReset,userInfoSateLogoUpdate } from "../Slice/UserSlice";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from 'react-router';

let formSubmitStatus = false;

const ProfileImage = ({classes,nextTabHandler,previousTabHandler,finalSubmitHandler,qparam}) => {

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();  
  const userInfoState = useSelector(selectUserInfoState);  
  let fileReader;
  const MAX_FILE_SIZE_MB =1;
  const [logo,setLogo] = React.useState(userInfoState.data.logo);
  const {_usid} = qparam;
  const history = useHistory();

  const fileChangedHandler = (event) => {
        
        if(event.target.files[0]){
            let fileSize= (((event.target.files[0].size)/1024)/1024);
            if(fileSize>0) {
            if(fileSize>MAX_FILE_SIZE_MB){            
                return;
            }
            fileReader = new FileReader();
            fileReader.onloadend = () => setLogo(fileReader.result);  
            fileReader.readAsDataURL(event.target.files[0]);
            }
        }
     
    };

    const [saveStatus,setSaveStatus] = React.useState(false);

    React.useEffect(()=>{
        return function cleanup() {
            formSubmitStatus = false;
            dispatch(userInfoStatusReset());
        }
        
    },[]);

    const nextTab = () => {
        dispatch(userInfoSateLogoUpdate(logo));
        setOpen(true);       
    }
    const previousTab = () => {
        dispatch(userInfoSateLogoUpdate(logo))
        previousTabHandler();
    } 

    const saveUserInfoHandler = () => {
        finalSubmitHandler();
    } 

    const handleClose = (status) => {
        setOpen(false);
        if(status === "yes"){
            setSaveStatus(true);
        }
    };

    const AgreeModal = () => {
       return( 
        <div>           
            <Dialog
            open={open}
            onClose={()=>handleClose("no")}
            aria-labelledby="user-alert-dialog-title"
            aria-describedby="uesr-alert-dialog-description"
            >
            <DialogTitle id="user-alert-dialog-title">Application :</DialogTitle>
            <DialogContent>
                <DialogContentText id="uesr-alert-dialog-description">
                   {"Do you want save the user information!!!"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>handleClose("no")} color="primary">
                  Disagree
                </Button>
                <Button onClick={()=>handleClose("yes")} color="primary" autoFocus>
                   Agree
                </Button>
            </DialogActions>
            </Dialog>
        </div>
       );
    }

    const pageRedirect = () =>{
       if(formSubmitStatus===false){
        formSubmitStatus  = true;
       } 
       if(formSubmitStatus && _usid){
            setTimeout(() => {
                history.goBack();
            }, 2000);
       }
       
    }

    return (
        <div>
             <Paper style={{ padding: 16 }} variant="outlined" square  >
                <Grid container spacing={1} direction="row" justify="space-around" alignItems="flex-start">
                    <Grid item xs={12} >
                        <Typography variant="h6" component="h6" align="left">
                            User Profile Image :
                        </Typography>
                        <Divider />
                        <Divider />
                    </Grid>
                    <Grid item xs={2}>
                    <label htmlFor="upload-photo" align="left">
                        <input
                        style={{ display: "none" }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={fileChangedHandler}
                        />
                        
                        <Button color="primary" variant="contained" component="span" ><AddIcon />
                          Upload Photo
                        </Button>{" "}
                    </label>
                    </Grid>
                    <Grid item xs={10}>
                        <Avatar alt="No Image" src={logo}></Avatar>
                    </Grid>
                    <Grid item xs={4}>
                        
                    </Grid>
                    <Grid item xs={4}>
                       {
                           userInfoState.isSubmited ? <CircularProgress /> 
                           : (
                              userInfoState.error ? <Typography>{userInfoState.error}</Typography>
                               : (
                               userInfoState.success ?  <Typography>{"Successfuly User Information saved..."}{pageRedirect()}</Typography> 
                                  : null 
                                 )
                            )

                       }
                    </Grid>
                    <Grid item xs={4} align="right" >                                                                
                        <Button variant="contained" color="primary" className={classes.menuButton} size="medium" onClick={previousTab} >Previous</Button>   
                        {
                             saveStatus ?
                                (<Button variant="contained" size="medium" color="primary" onClick={saveUserInfoHandler} >Save</Button>)         
                            :                               
                               (<><Button variant="contained" size="medium" color="primary" className={classes.menuButton}  onClick={nextTab} >Save</Button><AgreeModal/></>) 
                        }                       
                        
                    </Grid>
                </Grid>
             </Paper>
        </div>
    )
}

export default ProfileImage
