import {v4 as uuidv4} from 'uuid';
import fs from 'fs';

const _basedir = './src/server/data/';
const resolveReportDir = (reportId) => _basedir + reportId;
const resolveReportPath = (reportId) => resolveReportDir(reportId) + '/report.json';
const resolveRawPath = (reportId) => resolveReportDir(reportId) + `/raw.json`;

const initState = {
    loading: true,
    results: {},
    data: [],

};

const initRawState = {
    loading: true,
    results: {},
    data: [],
};

const writeCallback = (err) => err && console.error(err);

export const initReport = () => {
    const reportId = uuidv4();
    fs.mkdirSync(resolveReportDir(reportId));
    fs.writeFileSync(resolveReportPath(reportId), JSON.stringify(initState));
    fs.writeFileSync(resolveRawPath(reportId), JSON.stringify(initRawState));
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

export const setScrapedData = async (reportId, results) => {
    const reportPath = resolveReportPath(reportId);
    const contentPath = resolveRawPath(reportId);

    if (fs.existsSync(reportPath)) {
        let json = fs.readFileSync(reportPath);
        const report = JSON.parse(json);
        const updatedReport = {
            ...report,
            results,
        };
        fs.writeFileSync(reportPath, JSON.stringify(updatedReport));

        json = fs.readFileSync(contentPath);
        const content = JSON.parse(json);
        const updatedContent = {
            ...content,
            results,
        };
        fs.writeFileSync(contentPath, JSON.stringify(updatedContent));
    } else {
        throw new Error(`reportId: ${reportId} does not exist`);
    }
};

export const addProcessedContent = (reportId, info) => {
    const id = uuidv4();

    const reportPath = resolveReportPath(reportId);
    if (fs.existsSync(reportPath)) {
        fs.readFile(reportPath, (err, json) => {
            if (err) throw err;

            const report = JSON.parse(json);
            const updatedReport = {
                ...report,
                data: [
                    ...report.data,
                    ...info,
                ]
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
            const updatedRaw = {
                ...raw,
                data: [
                    ...raw.data,
                    ...rawData,
                ]
            };
            fs.writeFile(contentPath, JSON.stringify(updatedRaw), writeCallback);
        });
    } else {
        throw new Error(`reportId: ${reportId} does not exist`);
    }
};

export const setLoading = (reportId, loading) => {
    const reportDir = resolveReportDir(reportId);
    if (fs.existsSync(reportDir)) {
        const contentPath = resolveRawPath(reportId);
        const reportPath = resolveReportPath(reportId);

        fs.readFile(contentPath, (err, json) => {
            if (err) throw err;

            console.log('writing to file:', contentPath);
            const raw = JSON.parse(json);
            const updatedRaw = {
                ...raw,
                loading,
            };
            fs.writeFile(contentPath, JSON.stringify(updatedRaw), writeCallback);
        });

        fs.readFile(reportPath, (err, json) => {
            if (err) throw err;

            const report = JSON.parse(json);
            const updatedReport = {
                ...report,
                loading,
            };
            fs.writeFile(reportPath, JSON.stringify(updatedReport), writeCallback);
        });
    } else {
        throw new Error(`reportId: ${reportId} does not exist`);
    }
};

export const readRawContent = (reportId) => fs.readFileSync(resolveRawPath(reportId));