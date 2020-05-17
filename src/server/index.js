import express from 'express';
import { scrape, report } from './scrape-handler';
import {readRawContent, readReport} from "./data";

const app = express();
const port = 80;

const TOKEN = '0dacee19-4651-40c9-af34-3cca75cd4442';

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    const token = req.headers && req.headers.token;
    if (TOKEN !== token) {
        res.status(403);
        res.send({ error: 'You are not authorized to use this resource.' });
        return;
    }
    next();
});

const missingKeywords = (keyWords, res) => {
    if (!keyWords) {
        res.status(400);
        res.send({ error: 'keyWords must be provided in request body.' });
        return true;
    }
    return false;
};


// endpoints
app.post('/serp', async (req, res) => {
    const { keyWords, numPages, browserConfig } = req.body;

    if (missingKeywords(keyWords, res)) {
        return;
    }

    const results = await scrape(keyWords, numPages, browserConfig);
    res.send(results);
});

app.post('/serp/report', async (req, res) => {
    const { keyWords, numPages, browserConfig } = req.body;

    if (missingKeywords(keyWords, res)) {
        return;
    }

    const id = report(keyWords, numPages, browserConfig);
    res.send(id);
});

app.get('/serp/report/:id', async (req, res) => {
    const id =  req.params && req.params.id;

    if (!id) {
        res.status(400);
        res.send({ error: 'path param id must be provided: /serp/report/:id' });
        return;
    }

    res.send(readReport(id));
});

app.get('/serp/report/:id/raw', async (req, res) => {
    const id =  req.params && req.params.id;

    if (!id) {
        res.status(400);
        res.send({ error: 'path param id must be provided: /serp/report/:id/raw' });
        return;
    }

    res.send(readRawContent(id));
});

app.listen(port, () => console.log(`🚀 vontheserp started on port: ${port}`));