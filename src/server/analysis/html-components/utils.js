

export const filterContent = obj =>
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