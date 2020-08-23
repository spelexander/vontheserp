import fetch from 'node-fetch';

// const scraperClusterUrl = 'http://ec2-13-55-35-246.ap-southeast-2.compute.amazonaws.com:8080';
const scraperClusterUrl = 'http://localhost:8082';

const token = 'Bearer 0dacee19-4651-40c9-af34-3cca75cd4442';

export const fetchHtml = (url) => fetch(`${scraperClusterUrl}/html`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token
    },
    body: JSON.stringify({
        url
    }),
    method: 'POST',
    mode: 'cors',
}).then(res => res.text());

export const fetchResults = (request) => fetch(`${scraperClusterUrl}/serp`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token
    },
    body: JSON.stringify({
        ...request
    }),
    method: 'POST',
    mode: 'cors',
}).then(res => res.json());
