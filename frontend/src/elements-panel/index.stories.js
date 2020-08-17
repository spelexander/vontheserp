import React from "react";
import ElementsPanel from "./index";

export default {
    component: ElementsPanel,
    title: 'Elements Panel',
};

const content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

export const mockElements = [
    {
        pageName: 'blah blah.io something good',
        index: 10,
        elementName: 'div',
        content,
    },
    {
        pageName: 'something something .org',
        index: 3,
        elementName: 'h1',
        content,
    },
    {
        pageName: 'hoop-doops with floops.com',
        index: 1,
        elementName: 'meta',
        content,
    },
    {
        pageName: 'blah blah.io something good',
        index: 10,
        elementName: 'div',
        content,
    },
    {
        pageName: 'something something .org',
        index: 3,
        elementName: 'h1',
        content,
    },
    {
        pageName: 'hoop-doops with floops.com',
        index: 1,
        elementName: 'meta',
        content,
    }
    ];

export const mockElementProps = [
        {
            name: 'div',
            elements: mockElements
        },
        {
            name: 'li',
            elements: mockElements
        },
        {
            name: 'h1',
            elements: mockElements
        },
        {
            name: 'h2',
            elements: mockElements
        },
        {
            name: 'meta',
            elements: mockElements
        }
    ];

export const ElementsPanelExample = () => <ElementsPanel elements={mockElementProps} />;