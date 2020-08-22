import React, {useState, useCallback} from 'react'
import {QueryField, QuerySearchButton, Wrapper} from './styled';
import Paper from "@material-ui/core/Paper/Paper";
import {useSelectedReport, useSerpData} from "../store";
import {useSetInterval} from "../services";
import TuneIcon from '@material-ui/icons/Tune';

let lastQuery = null;

const QueryEntry = () => {

    const [query, setQuery] = useState(true);
    const [state, {fetchReport, fetchResults}] = useSerpData();
    const {results} = useSelectedReport(state);

    const handleTextFieldChange = (e) => setQuery(e.target.value);
    const canRunQuery = query && (lastQuery == null || lastQuery !== query);

    const runQuery = () => {
        if (canRunQuery && query) {
            fetchReport([query]);
            lastQuery = query;
        }
    };

    const loading = results.loading;
    const error = results.error;

    const pollServer = useCallback(async () => {
        if (loading) {
            fetchResults();
        }
    }, [results, loading, error]);

    useSetInterval(loading, error, pollServer, 2000);

    return <Paper>
        <Wrapper>
            <QueryField
                label="Query"
                margin="normal"
                variant="outlined"
                onChange={handleTextFieldChange}
            />
            <QuerySearchButton
                variant="contained"
                color="primary"
                onClick={runQuery}
                disabled={!canRunQuery}
            >
                run query
            </QuerySearchButton>
            <QuerySearchButton
                variant="contained"
                color="primary"
                disabled={true}
            >
                <TuneIcon/>
            </QuerySearchButton>
        </Wrapper>
    </Paper>;
};

export default QueryEntry;