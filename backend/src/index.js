import express from 'express';
import {scrape, report, readElements} from './scrape-handler';
import {readLoading, readRawContent, readReport} from "./database";

const app = express();
const port = 8080;

const TOKEN = '0dacee19-4651-40c9-af34-3cca75cd4442';

// middleware
app.use(express.json());
app.use(express.urlencoded());
// app.use((req, res, next) => {
//     const token = req.headers && req.headers.token;
//     if (TOKEN !== token) {
//         res.status(403);
//         res.send({ error: 'You are not authorized to use this resource.' });
//         return;
//     }
//     next();
// });

const missingKeywords = (keywords, res) => missingArg(keywords, 'keywords must be provided in request body.', res);

const missingArg = (arg, message, res) => {
    if (!arg) {
        res.status(400);
        res.send({ error: message });
        return true;
    }
    return false;
};


// endpoints
app.post('/serp', async (req, res) => {
    const { keywords, numPages, browserConfig } = req.body;

    if (missingKeywords(keywords, res)) {
        res.status(400);
        res.send({ error: 'keywords must be provided' });
    }

    const results = await scrape(keywords, numPages, browserConfig);
    res.send(results);
});

app.post('/serp/report', async (req, res) => {
    const { keywords, numPages, browserConfig } = req.body;

    if (missingKeywords(keywords, res)) {
        res.status(400);
        res.send({ error: 'keywords must be provided' });
    }

    const id = report(keywords, numPages, browserConfig);
    res.send(id);
});

app.get('/serp/report/:id', async (req, res) => {
    const id =  req.params && req.params.id;

    if (!id) {
        res.status(400);
        res.send({ error: 'path param id must be provided: /serp/report/:id' });
        return;
    }

    const response = await readReport(id);
    res.send(response);
});

app.get('/serp/report/:id/raw', async (req, res) => {
    const id =  req.params && req.params.id;

    if (!id) {
        res.status(400);
        res.send({ error: 'path param id must be provided: /serp/report/:id/raw' });
        return;
    }

    const response = await readRawContent(id);
    res.send(response);
});

app.post('/serp/report/:id/elements', async (req, res) => {
    const id =  req.params && req.params.id;

    if (!id) {
        res.status(400);
        res.send({ error: 'path param id must be provided: /serp/report/:id/raw' });
        return;
    }

    const { elements } = req.body;
    if (missingArg(elements, 'Elements to scrape must be provided', res)) {
        return;
    }

    const response = await readElements(id, elements);
    res.send(response);
});

app.listen(port, () => console.log(`🚀 vontheserp started on port: ${port}`));