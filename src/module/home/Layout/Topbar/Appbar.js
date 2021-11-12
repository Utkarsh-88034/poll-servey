import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import clsx from "clsx";
import ProfileMenuNav from "./ProfileMenuNav";
import StateMenu from "./StateMenu";




const Appbar = (props) => {
  const { classes, handleDrawerOpen, open } = props;
  //console.log("Appbar");
  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        
      >
        <Toolbar variant="dense" >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={clsx(classes.menuButton, open && classes.hide)}
            onClick={() => handleDrawerOpen()}
           
          >
           <MenuIcon />
          </IconButton>
          <Typography
            noWrap
            component="h6"
            variant="h6"
            color="inherit"           
            className={classes.grow}
            align="left"
          >
            React User Application
          </Typography>

          <StateMenu classes={classes} />
          
          <IconButton aria-label="show 1 new mails" color="inherit">
            <Badge badgeContent={1} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 0 new notifications" color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <ProfileMenuNav classes={classes} /> 
        </Toolbar>
      </AppBar>
    </div>
  );
};




export default Appbar;
