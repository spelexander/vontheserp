import {createStore, createHook} from 'react-sweet-state';
import {createReport} from "../services/create-report";
import {getElements} from "../services/elements/inex";
import {convertToElementData, convertToElementRequest, convertToTags, getValuesForTag} from "../services/utils";
import {getResults} from "../services/results";

const initialState = {
    selectedReport: null,
};

const setSelectedSites = (selectedSites) => ({setState, getState}) => {
    const existingState = getState();
    const reportId = existingState.selectedReport;
    const reportExistingState = selectReportFromState(reportId, existingState);

    setState({
        ...existingState,
        [reportId]: {
            ...reportExistingState,
            selectedSites,
        }
    });
};

const setError = (error, setState, getState) => {
    console.error(error);
};

const selectReportFromState = (reportId, state) => {
    return state[reportId];
};

const selectReportResultsLoadingFromState = (reportId, state) => {
    const report = state[reportId];
    return report && report.results && report.loading;
};

const selectReportElementsLoadingFromState = (reportId, state) => {
    const report = state[reportId];
    return report && report.results && report.loading;
};

const fetchElements = (requests) => ({setState, getState}) => {
    const existingState = getState();
    const reportId = existingState.selectedReport;
    const elementRequests = requests.map(element => convertToElementRequest(element));

    const setElements = (data) => {

        const reportExistingState = selectReportFromState(reportId, existingState);
        if (data && data.loading) {
            return;
        }

        const tags = convertToTags(data.elements);
        const rawElements = convertToElementData(data.elements);

        const elementsToSet = {};
        tags.forEach(tag => {
            elementsToSet[tag] = getValuesForTag(tag, rawElements || []);
        });

        setState({
            ...existingState,
            [reportId]: {
                ...reportExistingState,
                elements: {
                    ...reportExistingState.elements,
                    loading: false,
                    data: elementsToSet,
                    tags,
                },
            }
        });
    };

    getElements(reportId, elementRequests, setElements, (e) => setError(e, setState, getState));
};

const fetchResults = () => ({setState, getState}) => {
    const existingState = getState();
    const reportId = existingState.selectedReport;

    const setResults = (results) => {
        const reportExistingState = selectReportFromState(reportId, existingState);

        setState({
            ...existingState,
            [reportId]: {
                ...reportExistingState,
                results: {
                    ...reportExistingState.results,
                    loading: false,
                    ...results,
                    data: results.data && Object.values(results.data),
                },
            }
        });
    };

    getResults(reportId, setResults, (e) => setError(e, setState, getState));
};

const fetchReport = (keyWords) => ({setState, getState}) => {
    const {currentState} = getState();

    const setReportId = (reportId) => setState({
        ...currentState,
        selectedReport: reportId,
        [reportId]: {
            results: {
                loading: true,
                data: null,
                error: null,
            },
            elements: {
                loading: true,
                data: null,
                error: null,
                tags: [],
            },
            selectedSites: {},
            keyWords,
        }
    });

    createReport(keyWords, setReportId, (e) => setError(e, setState, getState));
};

const Store = createStore({
        initialState,
        actions: {
            fetchReport,
            fetchResults,
            fetchElements,
            setError,
            setSelectedSites,
        },
        name: 'serp results',
    }
);

export const useSerpData = createHook(Store);

export const useSelectedReport = (state) => {
    return state[state.selectedReport] || {
        results: {
            loading: false,
            data: null,
            error: null,
        },
        elements: {
            loading: false,
            data: null,
            error: null,
            tags: [],
        },
        selectedSites: {},
        keyWords: null
    }
};