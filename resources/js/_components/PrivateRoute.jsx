import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { accountService } from '../_services'

export const PrivateRoute = (component) => {
    const auth = accountService.getAccount();
    console.log(component);
    return auth ? component : <Navigate to="/weblogin" />;
};
