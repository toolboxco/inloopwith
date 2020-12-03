const TAG = {
    PRODUCT_HUNT: 'product_hunt',
    HACKER_NEWS: 'hacker_news',
    R_WORLD_NEWS: 'r_worldnews',
    R_FUTUROLOGY: 'r_futurology',
    R_TECHNOLOGY: 'r_technology',
};

const TAG_PROPS = {
    [TAG.PRODUCT_HUNT]: {
        min: 3,
        max: 4,
    },
    [TAG.HACKER_NEWS]: {
        min: 4,
        max: 6,
    },
    [TAG.R_TECHNOLOGY]: {
        min: 1,
        max: 2,
    },
    [TAG.R_WORLD_NEWS]: {
        min: 1,
        max: 1,
    },
    [TAG.R_FUTUROLOGY]: {
        min: 1,
        max: 1,
    },
};

const tagsOrder = [
    TAG.PRODUCT_HUNT,
    TAG.HACKER_NEWS,
    TAG.R_FUTUROLOGY,
    TAG.R_WORLD_NEWS,
    TAG.R_TECHNOLOGY,
];

export default function createDigestItems(digests) {
    return tagsOrder
        .filter((tag) => !!digests.find((item) => item.tag === tag))
        .map((tag, _, array) => {
            const { length } = array;
            const selectedDigests = digests
                .find((item) => item.tag === tag)
                .items.slice(0, TAG_PROPS[tag][length === 2 ? 'max' : 'min']);
            return selectedDigests.map((digestItem) => ({
                ...digestItem,
                tag,
            }));
        })
        .reduce((accum, item) => [...accum, ...item], []);
}
