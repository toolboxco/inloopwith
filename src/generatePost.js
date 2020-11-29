const dayjs = require('dayjs');

const productHuntContentHeader = (humanDate) =>
    [`🦄  *Product Hunt Digest | ${humanDate}*`].join('\n');

const hackerNewsContentHeader = (humanDate) =>
    [`⚡️ *Hacker News Digest | ${humanDate}*`].join('\n');

const contentFooter = [
    '_fin_',
    `⏩ Know someone who'd like this digest? Forward this message! https://bit.ly/joininloop`,
].join('\n');

const generateWhatsappPost = (payload) => {
    const humanDate = dayjs(new Date(payload.feed_date)).format('DD MMM YY');
    let contentHeader;
    if (payload.tag === 'product_hunt') {
        contentHeader = productHuntContentHeader(humanDate);
    }
    if (payload.tag === 'hacker_news') {
        contentHeader = hackerNewsContentHeader(humanDate);
    }

    if (!payload.items.length) {
        throw new Error('No items in payload');
    }

    const contentBody = payload.items
        .map((item, idx) => {
            return [
                payload.tag === 'product_hunt'
                    ? `${idx + 1}. *${item.name}* - ${item.title}`
                    : `${idx + 1}. *${item.title}*`,

                item.description && `\n_${item.description}_`,

                `👍 ${item.upvotes_count} | 💬 ${item.comments_count} | ${
                    item.short_link || item.original_link
                }`,
            ].join('\n');
        })
        .join('\n\n\n');

    const whatsappPost = [contentHeader, contentBody, contentFooter].join(
        '\n\n',
    );
    // console.log(whatsappPost)
    return whatsappPost;
};

export default generateWhatsappPost;
