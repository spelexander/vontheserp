import Keyv from 'keyv';
import {v4 as uuidv4} from 'uuid';

const keyv = new Keyv('mongodb://localhost:8081/test');

export const initReport = () => {
    const reportId = uuidv4();
    keyv.set(reportId, {
        report: {
            loading: true,
            error: null,
            data: null
        },
        raw: {
            loading: true,
            error: null,
            data: null,
        }

    });
    return reportId;
};

export const readReport = async (reportId) => {
    const report = await keyv.get(reportId);

    return (report && report.report) || {
        error: 'Report does not exist.'
    };
};

export const addProcessedContent = async (reportId, info) => {
    const report = await keyv.get(reportId);
    if (!report) {
        return report || {
            error: 'Report does not exist.'
        };
    }

    await keyv.set(reportId, {
        ...report,
        report: {
            loading: false,
            error: null,
            data: {
                ...report.report.data,
                ...info,
            },
        }

    });
    const valueToSet = await keyv.get(reportId);
};

export const addRawData = async (reportId, rawData) => {
    const report = await keyv.get(reportId);
    if (!report) {
        return report || {
            error: 'Report does not exist.'
        };
    }

    await keyv.set(reportId, {
        ...report,
        raw: {
            loading: false,
            error: null,
            data: {
                ...report.raw.data,
                ...rawData,
            },
        }

    });
};

export const readRawContent = async (reportId) => {
    const report = await keyv.get(reportId);

    return (report && report.raw) || {
        error: 'Report does not exist.'
    };
};