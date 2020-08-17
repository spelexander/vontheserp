import {createStore, createHook} from 'react-sweet-state';
import {createReport} from "../services/create-report";
import {getElements} from "../services/elements/inex";
import {convertToElementData, convertToElementRequest, convertToTags, getValuesForTag} from "../services/utils";

const initialState = {
    reportId: null,
    loading: false,
    selectedSites: [],
    pendingState: {
        error: null,
        loading: false,
        results: null,
        elements: null,
        tags: [],
    }
};

const setSelectedSites = (selectedSites) => ({setState, getState}) => {
    const state = getState();
    setState({
        ...state,
        selectedSites,
    });
};

const setLoadingElements = (loading, setState, getState) => {
    const {pendingState} = getState();
    setState({
        pendingState: {
            ...pendingState,
            loading: true,
        }
    });
};

const setError = (error, setState, getState) => {
    const {pendingState} = getState();
    setState({
        pendingState: {
            ...pendingState,
            error,
        }
    });
};

const fetchElements = (reportId, requests) => ({setState, getState}) => {
    const {pendingState} = getState();
    const elementRequests = requests.map(element => convertToElementRequest(element));

    setLoadingElements(true, setState, getState);

    const setElements = (datas) => {
        const results = datas.map(data => data.result);
        const tags = convertToTags(datas);
        const rawElements = convertToElementData(datas);

        const elements = {};
        tags.forEach(tag => {
            elements[tag] = getValuesForTag(tag, rawElements || []);
        });

        setState({
            loading: false,
            pendingState: {
                ...pendingState,
                loading: false,
                elements,
                tags,
                results,
            }
        });
    };

   getElements(reportId, elementRequests, setElements, (e) => setError(e, setState, getState));
};

const fetchReport = (keyWords) => ({setState, getState}) => {
    const { pendingState } = getState();

    const setReportId = (reportId) => setState({
        reportId,
        pendingState: {
            ...pendingState,
        }
    });

    createReport(keyWords, setReportId, (e) => setError(e, setState, getState));
};

const Store = createStore({
        initialState,
        actions: {
            fetchReport,
            fetchElements,
            setError,
            setSelectedSites,
        },
        name: 'serp results',
    }
);

export const useSerpData = createHook(Store);