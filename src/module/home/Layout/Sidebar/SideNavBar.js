import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NavMenu from '../../../common/NavMenu';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import {selectProfileInfoState} from "../../Slice/ProfileSlice";
import {useSelector} from "react-redux";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

const menuList = NavMenu.sideMenu;

const SideNavBar = (props) => {
    const {classes,handleDrawerClose,open,theme} = props;
    const [selectedIndex, setSelectedIndex] = React.useState("")
    const handleClick = index => {
      if (selectedIndex === index) {
        setSelectedIndex("")
      } else {
        setSelectedIndex(index)
      }
    }

    let result = [];
    const profileInfoState = useSelector(selectProfileInfoState);
    const profileModuleist = profileInfoState.modules; 
   

    
    
    console.log("SideNavBar");
    
    return (
     
       <>        
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}        
        classes={{
          paper: classes.drawerPaper
        }}
        key = "mainDrawer"
      >
         <Toolbar variant="dense" style={{backgroundColor: theme.palette.primary.main}}>
              <WhiteTextTypography
                  noWrap
                  component="h6"
                  variant="h6"
                  color="inherit"                  
                  className={classes.grow} 
                >
               Logo
              </WhiteTextTypography>
              <IconButton onClick={()=>handleDrawerClose()}>
                   {theme.direction === 'ltr' ? <ChevronLeftIcon className={classes.whiteColor} /> : <ChevronRightIcon className={classes.whiteColor} />}
              </IconButton>
          </Toolbar>
        
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"         
        >
         {
           menuList.filter(obj => obj.active).map(({code,Icon,label,link,items},index)=>{
            return(
              <List  key={code} >

                { 
                 items === undefined ?
                 (
                      <ListItem button key={index} component={NavLink} to={link} >
                          <ListItemIcon ><Icon/></ListItemIcon>
                          <ListItemText primary={label} />             
                      </ListItem> 
                  )
                  :
                  (
                     <>
                      <ListItem button key={index} 
                          onClick={() => {handleClick(index)}}>
                          <ListItemIcon ><Icon/></ListItemIcon>
                          <ListItemText primary={label} />
                          {
                            index === selectedIndex ? <ExpandLess /> : <ExpandMore />
                          }
                      </ListItem>
                      <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                                {
                                  items.filter(item => item.active && item.show).map((item, index) => {
                                      return (
                                        <ListItem button key={item.code} component={NavLink} to={item.link} >
                                            <ListItemIcon></ListItemIcon>
                                          <ListItemText primary={item.label} />
                                        </ListItem>
                                      )
                                    }
                                  )
                                }
                          </List>
                     </Collapse>
                     </>
                  )
                }
               </List> 
            )
          })
         }
        </List>  
      </Drawer>
       </>
    )
}

export default SideNavBar


