import React from "react";
import ChipsArray from "./index";

export default {
    component: ChipsArray,
    title: 'Chips Array',
};

const labels = [
    'h1',
    'h2',
    'body',
    'meta',
    'li',
    'p'
];

const selectedLabels = [
    'h2',
    'body',
    'meta',
];

export const ChipsArrayExample = () => <ChipsArray title="Selected element types"
                                                   selectedLabels={selectedLabels}
                                                   labels={labels}
/>;