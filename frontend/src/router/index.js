import React from 'react';
import {Route, Redirect, BrowserRouter} from 'react-router-dom';
import Login from './login';
import App from "../App";
import Logout from "./logout";

const Router = () => {
    return <BrowserRouter>
        <Route path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
    </BrowserRouter>

};

export default Router;