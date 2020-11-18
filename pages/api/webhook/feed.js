const { INLOOPWITH_API_KEY, DIGESTS_ENDPOINT, WA_URL } = process.env;
import axios from 'axios';
import generateWhatsappPost from '../../../src/generatePost';

export default async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(404)
    }

    const API_KEY = req.headers['x-ilw-api-key'];
    if (INLOOPWITH_API_KEY !== API_KEY) {
        return res.status(401).send('Unauthorized');
    }
    
    const payload = req.body;
    // console.log(payload);

    if (JSON.stringify(payload) === '{}') {
        return res.status(400).send({ error: 'Missing body' });
    }

    if (!payload.tag) {
        return res.status(400).send({ error: 'Missing tag' });
    }

    // store this payload to jsonbox collection accordingly
    if (payload.tag === 'product_hunt') {
        try {
            const responseData = await saveDigestToJsonBox('ph', payload);
            res.json({ message: responseData.message || 'Digest added' });

            // sendWhatsappMessage(payload, 'sendText');
        } catch (error) {
            console.log(error);
        }
    }

    if (payload.tag === 'hacker_news') {
        try {
            const responseData = await saveDigestToJsonBox('hn', payload);
            res.json({ message: responseData.message || 'Digest added' });

            sendWhatsappMessage(payload, 'sendText');
        } catch (error) {
            console.log(error);
        }
    }
};

const saveDigestToJsonBox = async (category, payload) => {
    const response = await axios({
        method: 'post',
        url: `${DIGESTS_ENDPOINT}/${category}`,
        data: payload,
    });
    return response.data;
};

const sendWhatsappMessage = async (payload, path) => {
    try {
        const message = generateWhatsappPost(payload);
        const response = await axios.post(
            `${WA_URL}/${path}`,
            {
                body: message,
            },
            {
                headers: {
                    'x-ilw-api-key': INLOOPWITH_API_KEY,
                },
            },
        );
        console.log(response.status === 200 ? '[INFO] Message Sent': null);
    } catch (error) {
        console.log('[Error] Failed sending WA message', error);
    }
};
