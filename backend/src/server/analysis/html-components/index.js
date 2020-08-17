import JSSoup from 'jssoup';
import rs from 'text-readability';
import countWords from 'count-words-occurrence'
import htt from 'cheerio-html-to-text';
import {filterContent} from "./utils";
import {ELEMENTS_TO_CHECK} from './default-elements';

export const countType = (soup, { tag, name, filter, notReadable }) => {
    let nodes = soup.findAll(tag);
    nodes = filter ? nodes.filter(node => node.attrs && node.attrs[filter.key] === filter.value) : nodes;
    const contents = nodes.map(node => notReadable ? node.toString() : toHumanText(node.toString() || ''));

    return {
        name,
        tag,
        count: nodes.length,
        contents,
    }
};

export const countDom = (html, content) => {
    const soup = new JSSoup(html);
    const components = ELEMENTS_TO_CHECK.map(toCheck => countType(soup, toCheck));

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
    frequencies = frequencies.filter(obj => filterContent(obj));
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