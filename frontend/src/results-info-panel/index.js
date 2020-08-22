import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ElementValueList from "./element-value-list";
import {TabWrapper} from "./styled";

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
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <TabWrapper>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable" scrollButtons="auto">
                <Tab label='Elements'/>
            </Tabs>
        </AppBar>
            <TabPanel value={value} index={0}>
                <ElementValueList/>
            </TabPanel>
    </TabWrapper>;
};

export default ElementsPanel;