const TITLE_LENGTH = 12;

export const shared = {
    initial_render_count: 0   
}

export function cleanUp(tag) {
    if (tag === '0') {
        return 'No Tagline Available';
    } else {
        return tag;
    }
}

export function getPageCount(rowCount, pageSize) {
    let pageCount = Math.floor(rowCount / pageSize);
    if (pageCount * pageSize < rowCount) {
        pageCount += 1;
    }
    return pageCount;
}

export function niceTitle(t) {
    if (t.length < TITLE_LENGTH) {
        return t;
    } else {
        return t.substring(0, TITLE_LENGTH) + ' ...'
    }
}