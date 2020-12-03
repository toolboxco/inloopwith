/* eslint-disable no-eval */
import axios from 'axios';
import { Promise } from 'bluebird';

import mergeDataKeys from '../../../src/utils/mergeDataKeys';

const {
    INLOOPWITH_API_KEY,
    DIGESTS_ENDPOINT,
    DEPLOY_URL,
    BITLY_ACCESS_TOKEN,
} = process.env;

const API_KEY_HEADER = 'x-ilw-api-key';

const { BitlyClient, isBitlyErrResponse } = require('bitly');

const bitly = new BitlyClient(BITLY_ACCESS_TOKEN);

const saveDigestToJsonBox = async (payload) => {
    if (!payload.length) {
        return null;
    }

    // get the last item and check if same feed exists
    // this prevents duplicate entries in case we ever need to call this again
    const { data: dataAtDigestsEndpoint } = await axios(
        `${DIGESTS_ENDPOINT}?sort=-feed_date&limit=1`,
    );

    if (dataAtDigestsEndpoint[0].feed_date === payload[0].feed_date) {
        return null;
    }

    const response = await axios({
        url: DIGESTS_ENDPOINT,
        method: 'post',
        data: payload,
    });
    return response.data;
};

const urlImageIsAccessible = async (url) => {
    const getUrls = eval("require('get-urls')");

    const correctedUrls = getUrls(url);
    if (correctedUrls.size !== 0) {
        const urlResponse = await axios(correctedUrls.values().next().value);
        const contentType = urlResponse.headers['content-type'];
        return new RegExp('image/*').test(contentType);
    }
    return false;
};

const getImage = async (htmlString, uri) => {
    const jsdom = eval("require('jsdom')");

    const { JSDOM } = jsdom;
    try {
        const dom = new JSDOM(htmlString);
        const { document } = dom.window;

        const ogImg = document.querySelector('meta[property="og:image"]');
        if (
            ogImg != null &&
            ogImg.content.length > 0 &&
            (await urlImageIsAccessible(ogImg.content))
        ) {
            return ogImg.content;
        }
        const imgRelLink = document.querySelector('link[rel="image_src"]');
        if (
            imgRelLink != null &&
            imgRelLink.href.length > 0 &&
            (await urlImageIsAccessible(imgRelLink.href))
        ) {
            return imgRelLink.href;
        }
        const twitterImg = document.querySelector('meta[name="twitter:image"]');
        if (
            twitterImg != null &&
            twitterImg.content.length > 0 &&
            (await urlImageIsAccessible(twitterImg.content))
        ) {
            return twitterImg.content;
        }
        const imgs = Array.from(document.getElementsByTagName('img'));
        if (imgs.length > 0) {
            // eslint-disable-next-line no-return-assign
            imgs.forEach((img) =>
                img.src.indexOf('//') === -1
                    ? // eslint-disable-next-line no-param-reassign
                      (img.src = `${new URL(uri).origin}/${img.src}`)
                    : img.src,
            );
            return imgs[0].src;
        }

        return null;
    } catch (e) {
        return null;
    }
};

const getDescription = async (htmlString) => {
    const jsdom = eval("require('jsdom')");
    const { JSDOM } = jsdom;

    try {
        const dom = new JSDOM(htmlString);
        const { document } = dom.window;

        const ogDescription = document.querySelector(
            'meta[property="og:description"]',
        );
        if (ogDescription != null && ogDescription.content.length > 0) {
            return ogDescription.content;
        }
        const twitterDescription = document.querySelector(
            'meta[name="twitter:description"]',
        );
        if (
            twitterDescription != null &&
            twitterDescription.content.length > 0
        ) {
            return twitterDescription.content;
        }
        const metaDescription = document.querySelector(
            'meta[name="description"]',
        );
        if (metaDescription != null && metaDescription.content.length > 0) {
            return metaDescription.content;
        }
        return null;
    } catch (e) {
        return null;
    }
};
async function linkPreviewGenerator(url) {
    try {
        const source = axios.CancelToken.source();
        setTimeout(() => {
            source.cancel();
        }, 30 * 1000);

        const { data } = await axios({
            method: 'GET',
            url,
            timeout: 30 * 1000,
            cancelToken: source.token,
        });

        if (!data) {
            return null;
        }
        const image = await getImage(data);
        const description = await getDescription(data);
        return {
            socialImage: image,
            socialDescription: description,
        };
    } catch (e) {
        // console.log('linkPreviewGenerator error', e);
        return null;
    }
}

const generateShortLink = async (longUrl) => {
    // return null;
    try {
        const response = await bitly.shorten(longUrl);
        return response.link;
    } catch (error) {
        if (isBitlyErrResponse(error)) {
            // Inferred type by TS is `BitlyErrorResponse`
            console.log(`Bitly error: ${error.description}`);
        } else {
            console.log(error);
        }
        return null;
    }
};

const getLinkPreviewData = async (link) => {
    const originalLink = link;
    const originalUrl = originalLink.includes('?')
        ? originalLink.split('?')[0]
        : originalLink;

    try {
        const previewData = await linkPreviewGenerator(originalUrl);
        return previewData;
    } catch (e) {
        // console.log(e);
        return null;
    }
};

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(404).send('Not found');
    }

    const { endpoint } = req.body;
    console.log('inloopwith reddit processing for endpoint', endpoint);
    if (!endpoint) {
        return res.status(400).json({ error: 'expected `endpoint`' });
    }

    const { data } = await axios(endpoint);
    if (!Array.isArray(data) && !data.length) {
        return res.status(400).json({ error: 'endpoint not populated' });
    }

    const hackerNewsKeys = [
        'hn_title',
        'hn_upvotes',
        'hn_comments',
        'hn_source_website',
    ];
    const productHuntKeys = [
        'ph_product_name',
        'ph_upvotes',
        'ph_comments',
        'ph_title',
    ];
    const rWorldNewsKeys = ['r_worldnews_title', 'r_worldnews_upvotes'];
    const rFuturologyKeys = ['r_futurology_title', 'r_futurology_upvotes'];
    const rTechnologyKeys = ['r_technology_title', 'r_technology_upvotes'];

    const createFeedItem = (item, tag) => ({
        title: item[`${tag}_title`],
        title_link: item[`${tag}_title_link`],
        upvotes_count: item[`${tag}_upvotes`],
        original_link: item[`${tag}_upvotes_link`],
    });

    const createHackerNewsFeedItem = (item) => ({
        title: item.hn_title,
        title_link: item.hn_title_link,
        upvotes_count: item.hn_upvotes,
        comments_count: item.hn_comments,
        original_link: item.hn_upvotes_link,
    });

    const createProductHuntFeedItem = (item) => ({
        name: item.ph_product_name,
        title: item.ph_title,
        upvotes_count: item.ph_upvotes,
        comments_count: item.ph_comments,
        original_link: item.ph_product_name_link.includes('?')
            ? item.ph_product_name_link.split('?')[0]
            : item.ph_product_name_link,
    });

    const dateWiseFeed = data.reduce((accum, item) => {
        const date = new Date(item.email_date).toISOString();
        const rWorldNews = mergeDataKeys(item, rWorldNewsKeys).map((wnItem) =>
            createFeedItem(wnItem, 'r_worldnews'),
        );

        const rFuturology = mergeDataKeys(
            item,
            rFuturologyKeys,
        ).map((futuroItem) => createFeedItem(futuroItem, 'r_futurology'));

        const rTechnology = mergeDataKeys(
            item,
            rTechnologyKeys,
        ).map((techItem) => createFeedItem(techItem, 'r_technology'));

        const hackerNews = mergeDataKeys(item, hackerNewsKeys).map((hnItem) =>
            createHackerNewsFeedItem(hnItem),
        );

        const productHunt = mergeDataKeys(item, productHuntKeys).map((phItem) =>
            createProductHuntFeedItem(phItem),
        );

        return [
            ...accum,
            {
                feed_date: date,
                tag: 'r_worldnews',
                items: rWorldNews,
            },
            {
                feed_date: date,
                tag: 'r_futurology',
                items: rFuturology,
            },
            {
                feed_date: date,
                tag: 'r_technology',
                items: rTechnology,
            },
            {
                feed_date: date,
                tag: 'hacker_news',
                items: hackerNews,
            },
            {
                feed_date: date,
                tag: 'product_hunt',
                items: productHunt,
            },
        ];
    }, []);

    const enumeratedDateWiseFeed = await Promise.map(
        dateWiseFeed,
        async (dateFeed) => {
            const { items } = dateFeed;
            const dataRichItems = await Promise.map(items, async (feedItem) => {
                const previewData = await getLinkPreviewData(
                    feedItem.title_link || feedItem.original_link,
                );
                const shortLink = await generateShortLink(
                    feedItem.original_link,
                );
                return {
                    ...feedItem,
                    description: previewData?.socialDescription,
                    image: previewData?.socialImage,
                    short_link: shortLink,
                };
            });

            return {
                ...dateFeed,
                items: dataRichItems,
            };
        },
    );

    await saveDigestToJsonBox(enumeratedDateWiseFeed);
    await axios.post(
        `${DEPLOY_URL}/api/internal/send-wa`,
        {},
        {
            headers: {
                [API_KEY_HEADER]: INLOOPWITH_API_KEY,
            },
        },
    );

    return res.json({ status: 'ok' });
};
