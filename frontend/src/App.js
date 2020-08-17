import React from 'react';
import './App.css';
import 'fontsource-roboto';
import {ApplicationElementsColumn, ApplicationResultsColumn, ApplicationResultsRow, ExportButton} from "./styled";
import QueryEntry from "./query-entry";
import QueryResultList from "./query-result-list";
import ElementsPanel from "./elements-panel";
import GetAppIcon from '@material-ui/icons/GetApp';

const defaultLabels = [
    'h1',
    'h2',
    'h3',
    'body',
    'meta:description',
    'title',
    'p'
];

function App() {

    return (
        <>
            <QueryEntry labels={defaultLabels}/>
            <ApplicationResultsRow>
                <ApplicationResultsColumn>
                    <QueryResultList/>
                </ApplicationResultsColumn>
                <ApplicationElementsColumn>
                    <ElementsPanel/>
                </ApplicationElementsColumn>
            </ApplicationResultsRow>
            <ExportButton>
                <GetAppIcon/>
            </ExportButton>
        </>
    );
}

export default App;
