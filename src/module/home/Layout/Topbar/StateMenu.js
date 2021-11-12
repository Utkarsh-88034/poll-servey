import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import {selectMasterInfoState} from "../../Slice/MasterSlice";
import {useSelector} from "react-redux";

const WhiteTextButton = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Button);


const StateMenu = (props) => {
 
  const {classes} = props;
  
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);  
  const [selectStateObj,setSelectStateObj] = React.useState({"stateName" : "Select State"});
  const masterInfoState = useSelector(selectMasterInfoState);
  const stateList = masterInfoState.data.stateList;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (stateCode,stateName) => {
    if(stateCode && stateName ){
        setSelectStateObj({ "stateName" : stateName, "stateCode" : stateCode});
    }    
    setOpen(false);
    //history.push("/home");
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }



  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    console.log("Sate Menu 2");
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open,selectStateObj.stateName]);
 


 
  console.log("Sate Menu");

  return (
    
     <>
       
         <WhiteTextButton
            edge="end"
            aria-label="account of current user"
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
            ref={anchorRef}
            variant="text" 
          >
           {selectStateObj.stateName}  
          </WhiteTextButton>            
         
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.paper} style={{maxHeight: 230, overflow: 'auto'}}>
                <ClickAwayListener onClickAway={()=>handleClose("","")}>
                  <MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  { 
                     stateList
                     .filter(obj => obj.activeStatus)
                     .map(({stateCode,stateName},index)=>{
                       return(
                         <MenuItem key={stateCode} onClick={()=>handleClose(stateCode,stateName)}>
                             <ListItemText primary={stateName} />
                         </MenuItem>
                       )                      
                    })
                   }
                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
     </>
  );
}

export default StateMenu;