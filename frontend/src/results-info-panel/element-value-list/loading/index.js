import React from 'react';
import {BarLoader} from "react-spinners";
import Typography from '@material-ui/core/Typography';
import Timer from "react-compound-timer";
import {Centered, CenteredWrapper} from "../../../components/styled";

const ElementsLoading = () => {
    return <CenteredWrapper>
        <Centered>
            <Typography variant="body2" component="p">
                <Timer formatValue={value => `Analysis time: ${value} s`}>
                    <Timer.Seconds/>
                </Timer>
                <BarLoader loading={true}/>
            </Typography>
        </Centered>
    </CenteredWrapper>;
};

export default ElementsLoading;