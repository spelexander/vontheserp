import React, {useEffect, useState} from 'react';
import {Route, Redirect, BrowserRouter} from 'react-router-dom';
import Login from './login';
import App from "../App";
import Logout from "./logout";
import {useAuth0} from "@auth0/auth0-react";
import {Centered, CenteredWrapper} from "../components/styled";
import {BarLoader} from "react-spinners";

const Router = () => {
    const {isLoading, loginWithRedirect, isAuthenticated} = useAuth0();

    console.log('isLoading, isAuthenticated', isLoading, isAuthenticated);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect({});
        }
    }, [isLoading]);


    if (isAuthenticated) {
        return <App/>
    }

    return <CenteredWrapper>
        <Centered>
            <BarLoader width={200} loading={true}/>
        </Centered>
    </CenteredWrapper>

    // return <BrowserRouter>
    //     <Route path="/login" component={Login} />
    //     <Route path="/logout" component={Logout} />
    //     <Route path="/" component={!isLoading && isAuthenticated ? App : () => <Redirect path="/" to="/login"/>} />
    // </BrowserRouter>
};

export default Router;