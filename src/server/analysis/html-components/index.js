import JSSoup from 'jssoup';
import rs from 'text-readability';
import countWords from 'count-words-occurrence'
import htt from 'cheerio-html-to-text';

const NODES_TO_CHECK = [
    {
        signature: 'a',
        name: 'links',
    },
    {
        signature: 'h1',
        name: 'headings 1',
    },
    {
        signature: 'h2',
        name: 'headings 2',
    },
    {
        signature: 'h3',
        name: 'headings 3',
    },
    {
        signature: 'h4',
        name: 'headings 4',
    },
    {
        signature: 'body',
        name: 'bodies',
    },
    {
        signature: 'p',
        name: 'paragraphs',
    },
    {
        signature: 'ol',
        name: 'ordered lists',
    },
    {
        signature: 'ul',
        name: 'unordered lists',
    },
    {
        signature: 'li',
        name: 'list items',
    },
    {
        signature: 'img',
        name: 'images',
    },
];

const countType = (soup, { signature, name }) => {
    const nodes = soup.findAll(signature);
    let content = '';
    let words = 0;
    let sentences = 0;

    nodes.forEach(node => {
        const nodeText = toHumanText(node.toString() || '');

        if (nodeText) {
            content += ` ${nodeText}`;
            sentences += rs.sentenceCount(nodeText);
            words += rs.lexiconCount(nodeText);
        }
    });

    const characters = content.length;
    const frequency = wordFrequency(content);

    const safeAverage = (total) => total > 0 && nodes.length > 0 ? Math.round(total / nodes.length) : 0;

    return {
        name,
        signature,
        count: nodes.length,
        meanCharactersPerWord: characters > 0 && words > 0 ? Math.round(safeAverage(characters) / safeAverage(words)) : 0,
        meanWords: safeAverage(words),
        meanSentences: safeAverage(sentences),
        frequency,
    }
};

export const countDom = (html, content) => {
    const soup = new JSSoup(html);

    const components = NODES_TO_CHECK.map(toCheck => countType(soup, toCheck));

    const wordCount = rs.lexiconCount(content);
    const sentenceCount = rs.sentenceCount(content);
    const frequency = wordFrequency(content);

    return {
        components,
        wordCount,
        sentenceCount,
        frequency,
    }
};

const wordFrequency = (humanText) => {
    let freqObj = countWords(humanText);
    let frequencies = [];

    Object.keys(freqObj).forEach(word => frequencies.push({
        word,
        count: freqObj[word]
    }));
    frequencies = frequencies.filter(obj =>
        obj.word.length > 2 &&
        obj.word.length < 20 &&
        !obj.word.includes('[') &&
        !obj.word.includes('http://') &&
        !obj.word.includes('<') &&
        !obj.word.includes('>') &&
        !obj.word.includes(']') &&
        !obj.word.includes('--') &&
        !obj.word.includes('*') &&
        obj.count > 1 &&
        !(/\d/.test(obj.word))
    );
    frequencies.sort(compare);
    frequencies = frequencies.splice(0, 50);
    return frequencies
};

const compare = (a, b) => {
    if (a.count > b.count) {
        return -1;
    }
    if (a.count < b.count) {
        return 1;
    }
    return 0;
};

export const toHumanText = (html) => {
    // content = textCleaner(content).stripHtml().condense().toLowerCase().valueOf();
    // content = content.replace(/ *\[[^)]*\] */g, "");
    // content = content.replace(/ *\<[^)]*\> */g, "");
    return htt.convert(html);
};