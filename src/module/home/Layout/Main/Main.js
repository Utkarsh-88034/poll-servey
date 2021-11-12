import React from 'react';
import clsx from 'clsx';
import NavRouteConfig from '../../../route/NavRouteConfig';
import NavMenu from '../../../common/NavMenu';

const Main = (props) => {

console.log("Main");

const { classes,open } = props;
    
return (
    <>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
          
        >
        <div className={classes.drawerHeader} />
        <NavRouteConfig menu={NavMenu.sideMenu} classes={classes} {...props}/>
      </main>
    </>
  )
}

export default Main
