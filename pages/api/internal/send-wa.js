import axios from 'axios';
import { Promise } from 'bluebird';
import generateWhatsappPost from '../../../src/generatePost';

const { INLOOPWITH_API_KEY, DIGESTS_ENDPOINT, WA_URL } = process.env;
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

    if (req.body?._id) {
        // automated message sending
        try {
            await sendWhatsappMessage(req.body);
            return res.json({ status: 'ok' });
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    // manually triggerable - sends last 2 entries as WA posts
    // assuming that data entry has successfully happened
    try {
        const { data } = await axios(
            `${DIGESTS_ENDPOINT}?sort=-feed_date&limit=2`,
        );

        await Promise.mapSeries(data, async (item) => {
            await sendWhatsappMessage(item);
        });
        return res.json({ status: 'ok' });
    } catch (e) {
        return res.status(500).send(e);
    }
}
