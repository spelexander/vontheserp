import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {Centered, CenteredWrapper} from "../../components/styled";
import {BarLoader} from "react-spinners";
import { Redirect } from 'react-router-dom';

const Login = () => {
    const {isLoading, isAuthenticated, loginWithRedirect} = useAuth0();

    if (isLoading) {
        return <CenteredWrapper>
            <Centered>
                <BarLoader width={200} loading={true}/>
            </Centered>
        </CenteredWrapper>
    }

    if (!isAuthenticated) {
        loginWithRedirect();
        return <CenteredWrapper>
            <Centered>
                <BarLoader width={200} loading={true}/>
            </Centered>
        </CenteredWrapper>;
    } else {
        return <Redirect to="/"/>
    }
};

export default Login;