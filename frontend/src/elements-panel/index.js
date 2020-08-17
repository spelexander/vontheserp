import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ElementValueList from "./element-value-list";
import {useSerpData} from "../store";
import {getValuesForTag} from "../services/utils";
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
    const [{pendingState, selectedSites},] = useSerpData();

    const tags = pendingState && pendingState.tags;
    const elements = pendingState && pendingState.elements;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <TabWrapper>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable" scrollButtons="auto">
                {tags && tags.map((tag) =>
                    <Tab label={tag}/>
                )}
            </Tabs>
        </AppBar>
        {tags && tags.map((tag, index) => {
            const displayData = (elements[tag] || []).filter(elem => !selectedSites || selectedSites.length <= 0 || selectedSites.includes(elem.result.rank - 1));

            return <TabPanel value={value} index={index}>
                <ElementValueList
                    tag={tag}
                    elements={displayData}/>
            </TabPanel>;
        })}
    </TabWrapper>;
};

export default ElementsPanel;