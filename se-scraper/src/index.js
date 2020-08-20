import express from 'express';
import {scrape, html} from './scrape-handler';

const app = express();
const port = 8080;

const TOKEN = 'Bearer 0dacee19-4651-40c9-af34-3cca75cd4442';

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    const token = req.headers && req.headers.authorization;
    if (TOKEN !== token) {
        res.status(403);
        res.send({ error: 'You are not authorized to use this resource.' });
        return;
    }
    next();
});

const missingKeywords = (keyWords, res) => missingArg(keyWords, 'keyWords must be provided in request body.', res);

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
        return;
    }

    const results = await scrape(keywords, numPages, browserConfig);
    res.send(results);
});

app.post('/html', async (req, res) => {
    const { url, browserConfig } = req.body;

    if (!url) {
        return;
    }

    const results = await html(url, browserConfig);
    res.send(results);
});


app.listen(port, () => console.log(`🚀 vontheserp started on port: ${port}`));