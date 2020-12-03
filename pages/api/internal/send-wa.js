import axios from 'axios';
import generateWhatsappPost from '../../../src/generatePost';
import createDigestItems from '../../../src/utils/createDigestItems';

const { INLOOPWITH_API_KEY, DEPLOY_URL, WA_URL } = process.env;
const API_KEY_HEADER = 'x-ilw-api-key';

const sendWhatsappMessage = async (payload, path = '/sendText') => {
    try {
        const message = generateWhatsappPost(payload);
        console.log(message);
        const response = await axios.post(
            `${WA_URL}${path}`,
            {
                body: message,
            },
            {
                headers: {
                    [API_KEY_HEADER]: INLOOPWITH_API_KEY,
                },
            },
        );
        console.log(response.status === 200 ? '[INFO] Message Sent' : null);
    } catch (error) {
        console.log('[Error] Failed sending WA message', error);
    }
};

export default async function handle(req, res) {
    if (req.method !== 'POST') {
        return res.status(404).send('Not found');
    }

    const API_KEY = req.headers['x-ilw-api-key'];
    if (INLOOPWITH_API_KEY !== API_KEY) {
        return res.status(401).send('Unauthorized');
    }

    // manually triggerable - picks up the latest digest
    // assuming that data entry has successfully happened
    try {
        const { data } = await axios(`${DEPLOY_URL}/api/digests`);
        const { digests } = data;
        if (!digests.length) {
            return res.json({ status: 'no digest found!' });
        }
        const digestDate = digests[0];
        const digestItems = createDigestItems(digests);
        await sendWhatsappMessage({
            feed_date: digestDate.feed_date,
            items: digestItems,
        });
        return res.json({ status: 'ok' });
    } catch (e) {
        return res.status(500).send(e);
    }
}
