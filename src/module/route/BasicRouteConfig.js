import React from 'react'
import CustomRoute from "./CustomRoute";
import Home from '../home/Home';
import Login from '../login/Login';
import { Redirect } from 'react-router';

const BasicRoutes = [
    <CustomRoute path='/' key="login"  exact type='public' component={Login}/>,
    <CustomRoute path='/home'  key="home" type='private' component={Home}/>,    
    <Redirect key="redirect-home" to="/home"/>
];

export default BasicRoutes