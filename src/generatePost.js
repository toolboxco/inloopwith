const dayjs = require('dayjs');

const startDate = dayjs('2020-10-25');

const productHuntContentHeader = (inloopEdition) =>
    [`⚡️ Inloop #${inloopEdition} — *Product Hunt*`].join('\n');

const hackerNewsContentHeader = (inloopEdition) =>
    [`⚡️ Inloop #${inloopEdition} — *Technology*`].join('\n');

const contentFooter = [
    '_fin_',
    `⏩  Know someone who'd like this digest? Forward this! Join Inloop — https://bit.ly/joininloop`,
].join('\n');

const generateWhatsappPost = (payload) => {
    const feedDate = dayjs(new Date(payload.feed_date));
    const inloopEdition = feedDate.diff(startDate, 'day');
    let contentHeader;
    if (payload.tag === 'product_hunt') {
        contentHeader = productHuntContentHeader(inloopEdition);
    }
    if (payload.tag === 'hacker_news') {
        contentHeader = hackerNewsContentHeader(inloopEdition);
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
