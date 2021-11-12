import React from 'react'
import { 
    Switch,
  } from "react-router-dom";

import CustomRoute from "./CustomRoute";

const NavRouteConfig = (props) => {
    let {menu} = props;
    return (
        
        <Switch>
         {

              menu.filter(obj => obj.active).map((obj,index)=>{
              return(
                obj.page!==undefined ?
                (
                  <CustomRoute path={obj.link} key={obj.label} type='private'  render={() => <obj.page {...props}/>} />                 
                )
                :
                (
                  obj.items.filter(item => item.active).map((item, index) => {
                    return(
                      <CustomRoute path={item.link} key={obj.label} type='private' render={() => <item.page {...props}/>} />    
                    )                   
                  })
                )
              )
            })
                  
         }
        </Switch>
    )
}

export default NavRouteConfig
