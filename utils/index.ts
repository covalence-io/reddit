export const BASE_URL = 'https://reddit.com';
export const SUBREDDIT_PATH = '/r/';
export const ALL_POSTS = 'all';
export const SUFFIX = '.json';

export function isNil(obj: any) {
    return obj === null || typeof obj === 'undefined';
}

export function isEmpty(obj: any) {
    return obj === '' || isNil(obj);
}

export function isObject(obj: any) {
    return obj != null && typeof obj === 'object';
}

export function isArray(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

export function serializeQuery(obj: any) {
    let qStr = '';

    if (!isObject(obj)) {
        return qStr;
    }

    const qArr = [] as string[];

    for (const p in obj) {
        qArr.push(`${p}=${obj[p]}`);
    }

    if (qArr.length > 0) {
        qStr += `?${qArr.join('&')}`;
    }

    return qStr;
}

const urlRegex = /^(https?:\/\/)/i;

export function getThumbnail(thumb: string) {
    if (isEmpty(thumb) || !urlRegex.test(thumb)) {
        return '/logos/subreddit.png';
    }

    return thumb;
}
