import React, {useState, useCallback} from 'react'
import {ChipInputStyled, QueryField, QuerySearchButton, Wrapper} from './styled';
import Paper from "@material-ui/core/Paper/Paper";
import {useSerpData} from "../store";
import {useSetInterval} from "../services";
import {getLoading} from "../services/loading";

let lastQuery = null;
let requesting = false;

const QueryEntry = (props) => {

    const [query, setQuery] = useState(true);
    const [selectedLabels, setSelectedLabels] = useState(props.labels);
    const [{reportId, pendingState}, {fetchReport, fetchElements}] = useSerpData();

    const handleAddChip = (chip) => {
        setSelectedLabels(selectedLabels.concat([chip]));
    };

    const handleDeleteChip = (chip, index) => {
        if (index > -1) {
            const labelsCopy = [...selectedLabels];
            labelsCopy.splice(index, 1);
            setSelectedLabels(labelsCopy);
        }
    };

    const handleTextFieldChange = (e) => setQuery(e.target.value);
    const canRunQuery = query && (lastQuery == null || lastQuery !== query);

    const runQuery = () => {
        if (canRunQuery && query) {
            requesting = false;
            fetchReport([query]);
            lastQuery = query;
        }
    };

    const results = pendingState && pendingState.results;
    const error = pendingState && pendingState.error;
    const shouldPoll = reportId && !requesting;

    const pollServer = useCallback(async () => {
        const loading = await getLoading(reportId);

            if (!loading) {
                requesting = true;
                fetchElements(reportId, selectedLabels);
            }
    }, [reportId, results, requesting]);

    useSetInterval(reportId, shouldPoll, error, pollServer, 1000);

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
        </Wrapper>
        <ChipInputStyled
            value={selectedLabels}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip, index) => handleDeleteChip(chip, index)}
        />
    </Paper>;
};

export default QueryEntry;