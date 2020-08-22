import {v4 as uuidv4} from 'uuid';
import fs from 'fs';

const _basedir = './src/server/data/';
const resolveReportDir = (reportId) => _basedir + reportId;
const resolveReportPath = (reportId) => resolveReportDir(reportId) + '/report.json';
const resolveRawPath = (reportId) => resolveReportDir(reportId) + `/raw.json`;
const resolveLoadingPath = (reportId) => resolveReportDir(reportId) + `/loading.json`;


const initState = {
    data: [],
};

const initRawState = {
    data: [],
};

const writeCallback = (err) => err && console.error(err);

export const initReport = () => {
    const reportId = uuidv4();
    fs.mkdirSync(resolveReportDir(reportId));
    fs.writeFileSync(resolveReportPath(reportId), JSON.stringify(initState));
    fs.writeFileSync(resolveRawPath(reportId), JSON.stringify(initRawState));
    fs.writeFileSync(resolveLoadingPath(reportId), JSON.stringify({ loading: true }));
    return reportId;
};

export const readReport = (reportId) => {
    const reportPath = resolveReportPath(reportId);
    if (fs.existsSync(reportPath)) {
        return JSON.parse(fs.readFileSync(reportPath, 'utf8'))
    }
    return {
        error: 'Report does not exist.'
    };
};

export const addProcessedContent = (reportId, info) => {
    const id = uuidv4();

    const reportPath = resolveReportPath(reportId);
    if (fs.existsSync(reportPath)) {
        fs.readFile(reportPath, (err, json) => {
            if (err) throw err;

            const report = JSON.parse(json);
            const data = report.data.concat(info);

            const updatedReport = {
                ...report,
                data,
            };
            fs.writeFile(reportPath, JSON.stringify(updatedReport), writeCallback);
        });
        return id;
    }
    throw new Error(`reportId: ${reportId} does not exist`);
};

export const addRawData = (reportId, rawData) => {
    const reportDir = resolveReportDir(reportId);
    if (fs.existsSync(reportDir)) {
        const contentPath = resolveRawPath(reportId);

        fs.readFile(contentPath, (err, json) => {
            if (err) throw err;

            const raw = JSON.parse(json);
            const data = raw.data.concat(rawData);

            const updatedRaw = {
                ...raw,
                data,
            };
            fs.writeFile(contentPath, JSON.stringify(updatedRaw), writeCallback);
        });
    } else {
        throw new Error(`reportId: ${reportId} does not exist`);
    }
};

export const setLoading = (reportId, loading) => {
    const loadingPath = resolveLoadingPath(reportId);
    if (fs.existsSync(loadingPath)) {
        fs.readFile(loadingPath, (err) => {
            if (err) throw err;
            fs.writeFile(loadingPath, JSON.stringify({ loading }), writeCallback);
        });
    } else {
        throw new Error(`reportId: ${reportId} does not exist`);
    }
};

export const readLoading = (reportId) => JSON.parse(fs.readFileSync(resolveLoadingPath(reportId)));

export const readRawContent = (reportId) => JSON.parse(fs.readFileSync(resolveRawPath(reportId)));