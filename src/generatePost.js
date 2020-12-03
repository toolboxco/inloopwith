const dayjs = require('dayjs');

const startDate = dayjs('2020-10-25');

const getHeader = (inloopEdition) =>
    [`⚡️ Inloop Digest #${inloopEdition}`].join('\n');

const contentFooter = [
    '_fin_',
    `⏩  Know someone who'd like this digest? Forward it!\n`,
    `_https://bit.ly/joininloop | https://inloopwith.xyz_`,
].join('\n');

const limitWords = (sentence, words) => {
    const newSentence = sentence
        .replace(/\s+/g, ' ')
        .split(' ')
        .slice(0, words)
        .join(' ');

    if (sentence.length !== newSentence.length) {
        return `${newSentence}...`;
    }
    return newSentence;
};

const tagMap = {
    r_worldnews: 'r/worldnews',
    r_futurology: 'r/futurology',
    product_hunt: 'Product hunt',
    hacker_news: 'Hacker news',
    r_technology: 'r/technology',
};

const generateWhatsappPost = (payload) => {
    const feedDate = dayjs(new Date(payload.feed_date));
    const inloopEdition = feedDate.diff(startDate, 'day');
    const contentHeader = getHeader(inloopEdition);

    if (!payload.items.length) {
        throw new Error('No items in payload');
    }

    const contentBody = payload.items
        .map((item, idx) => {
            return [
                item.name
                    ? `${idx + 1}. *${item.name}* - ${item.title}`
                    : `${idx + 1}. *${item.title}*`,

                item.description &&
                    `\n\n➡️ _${limitWords(item.description, 32)}_`,

                `\n👍 ${item.upvotes_count} | ${tagMap[item.tag]} · ${
                    item.short_link || item.original_link
                }`,
            ].join('');
        })
        .join('\n\n\n');

    const whatsappPost = [contentHeader, contentBody, contentFooter].join(
        '\n\n',
    );
    return whatsappPost;
};

export default generateWhatsappPost;
