import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ElementValueList from "./element-value-list";
import {TabWrapper} from "./styled";
import {Centered, CenteredWrapper} from "../components/styled";
import {ClimbingBoxLoader} from "react-spinners";
import Typography from "@material-ui/core/Typography";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (<>{children}</>)}
        </div>
    );
}

const ElementsPanel = () => {
    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <TabWrapper>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable"
                  scrollButtons="auto">
                <Tab label='Summary'/>
                <Tab label='Elements'/>
                <Tab label='Media'/>
                <Tab label='Content'/>
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <CenteredWrapper>
                <Centered>
                    <Typography variant="button" component="p">
                        Coming soon: results summary
                    </Typography>
                </Centered>
            </CenteredWrapper>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <ElementValueList/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <CenteredWrapper>
                <Centered>
                    <Typography variant="button" component="p">
                        Coming soon: media content (e.g. Images, video) summary
                    </Typography>
                </Centered>
            </CenteredWrapper>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <CenteredWrapper>
                <Centered>
                    <Typography variant="button" component="p">
                        Coming soon: content analysis (e.g. similarity, keyword density)
                    </Typography>
                </Centered>
            </CenteredWrapper>
        </TabPanel>
    </TabWrapper>;
};

export default ElementsPanel;