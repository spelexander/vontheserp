export const ELEMENTS_TO_CHECK = [
    {
        tag: 'meta',
        name: 'meta',
        filter: {key: 'name', value: 'description'},
        notReadable: true,
    },
    {
        tag: 'a',
        name: 'links',
    },
    {
        tag: 'h1',
        name: 'headings 1',
    },
    {
        tag: 'h2',
        name: 'headings 2',
    },
    {
        tag: 'h3',
        name: 'headings 3',
    },
    {
        tag: 'h4',
        name: 'headings 4',
    },
    {
        tag: 'body',
        name: 'bodies',
    },
    {
        tag: 'p',
        name: 'paragraphs',
    },
    {
        tag: 'ol',
        name: 'ordered lists',
    },
    {
        tag: 'ul',
        name: 'unordered lists',
    },
    {
        tag: 'li',
        name: 'list items',
    },
    {
        tag: 'img',
        name: 'images',
    },
];