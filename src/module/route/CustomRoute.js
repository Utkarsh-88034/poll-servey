import React from 'react'
import {Route, Redirect} from 'react-router'
import {useSelector} from "react-redux";
import {selectAuthState} from "../login/LoginSlice"; 

const CustomRoute = props => {
  const authState = useSelector(selectAuthState);
  const isAuthenticated =  authState.isAuthenticated;
  const { type } = props;
  if('private'=== type ){
      if(isAuthenticated === true){
        return <Route {...props} />;
      }else{
        return <Redirect to="/"  />
      }
  }else{
    return <Route {...props} />;
  } 

};

export default CustomRoute;
