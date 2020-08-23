import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {Centered, CenteredWrapper} from "../../components/styled";
import {BarLoader} from "react-spinners";
import { Redirect } from 'react-router-dom';

const Logout = () => {
    const {isLoading, logout, isAuthenticated} = useAuth0();

    if (isLoading) {
        return <CenteredWrapper>
            <Centered>
                <BarLoader width={200} loading={true}/>
            </Centered>
        </CenteredWrapper>
    }

    if (isAuthenticated) {
        logout();
        return <CenteredWrapper>
            <Centered>
                <BarLoader width={200} loading={true}/>
            </Centered>
        </CenteredWrapper>;
    } else {
        return <Redirect to="/login"/>
    }
};

export default Logout;