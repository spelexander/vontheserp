import React, {useEffect} from 'react';
import './App.css';
import 'fontsource-roboto';
import {ApplicationElementsColumn, ApplicationResultsColumn, ApplicationResultsRow, ExportButton} from "./styled";
import QueryEntry from "./query-entry";
import QueryResultList from "./query-result-list";
import ElementsPanel from "./results-info-panel";
import GetAppIcon from '@material-ui/icons/GetApp';
import {useSelectedReport, useSerpData} from "./store";
import {BarLoader, ClimbingBoxLoader} from "react-spinners";
import {Centered, CenteredWrapper} from "./components/styled";
import Typography from "@material-ui/core/Typography";

function App() {

    const [state,] = useSerpData();
    const {results} = useSelectedReport(state);
    const loading = results && results.loading;
    const {selectedReport} = state;

    return (
        <>
            <QueryEntry/>
            {
                !selectedReport &&
                <CenteredWrapper>
                    <Centered>
                        <Typography variant="button" component="p">
                            Enter keywords above to begin
                        </Typography>
                        <div style={{marginLeft: '50px'}}>
                            <ClimbingBoxLoader size={15} loading={true}/>
                        </div>
                    </Centered>
                </CenteredWrapper>
            }
            {
                loading &&
                <CenteredWrapper>
                    <Centered>
                        <BarLoader width={200} loading={true}/>
                    </Centered>
                </CenteredWrapper>
            }
            {
                !loading && selectedReport ?
                    <ApplicationResultsRow>
                        <ApplicationResultsColumn>
                            <QueryResultList/>
                        </ApplicationResultsColumn>
                        <ApplicationElementsColumn>
                            <ElementsPanel/>
                        </ApplicationElementsColumn>
                    </ApplicationResultsRow>
                    : null
            }
            <ExportButton>
                <GetAppIcon/>
            </ExportButton>
        </>
    );
}

export default App;
