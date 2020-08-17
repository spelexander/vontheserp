import React from "react";
import QueryResultList from "./index";

export default {
    component: QueryResultList,
    title: 'Query Result List',
};

const result = {
    name: 'Master Electrician, 24/7 - Upfront Price, First Time Fix‎',
    link: 'https://www.yellowpages.com.au/find/electricians-electrical-contractors/sydney-cbd-nsw'
};

const results = [
    result,
    result,
    result,
    result,
    result,
];

export const QueryResultListExample = () => <QueryResultList results={results} />;