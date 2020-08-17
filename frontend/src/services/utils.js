const specialElements = {
    'meta:description': {
        name: "meta description",
        tag: "meta",
        filter: {
            key: "name",
            value: "description"
        },
        notReadable: true
    },
};

export const convertToElementRequest = (elementChip) => {
    const specialElement = specialElements[elementChip];

    if (specialElement) {
        return specialElement;
    }

    return {
        name: elementChip,
        tag: elementChip,
        notReadable: true,
    };
};

export const convertToTags = (datas) => {
    if (datas && datas.length > 0) {
        const data = datas[0];
        return Object.keys(data.elements);
    }

    return [];
};

export const convertToElementData = (datas) => {
    let elementsWithTagAndResult = [];

    datas.forEach(data => {
        const result = data.result;
        const elements = data.elements;

        Object.keys(elements).forEach(elemKey => {
            const elementValues = elements[elemKey] && elements[elemKey].contents || [];
            elementValues.forEach(value => elementsWithTagAndResult.push({
                result,
                tag: elemKey,
                value,
            }));
        });
    });

    return elementsWithTagAndResult;
};

export const getValuesForTag = (tag, values) => values.filter(value => value.tag === tag);