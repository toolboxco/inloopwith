import axios from 'axios';

const { INLOOPWITH_API_KEY, DIGESTS_ENDPOINT, DEPLOY_URL } = process.env;

const API_KEY_HEADER = 'x-ilw-api-key';

const saveDigestToJsonBox = async (category, payload) => {
    const response = await axios({
        method: 'post',
        url: `${DIGESTS_ENDPOINT}/${category}`,
        data: payload,
    });
    return response.data;
};

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(404).send('Not found');
    }

    const API_KEY = req.headers[API_KEY_HEADER];
    if (INLOOPWITH_API_KEY !== API_KEY) {
        return res.status(401).send('Unauthorized');
    }

    const payload = req.body;

    if (!(typeof payload === 'object' && Object.keys(payload).length)) {
        return res.status(400).send({ error: 'Missing body' });
    }

    if (!['product_hunt', 'hacker_news'].includes(payload.tag)) {
        return res.status(400).send({ error: 'Incorrect tag' });
    }

    try {
        const responseData = await saveDigestToJsonBox(
            payload.tag === 'product_hunt' ? 'ph' : 'hn',
            payload,
        );

        await axios.post(`${DEPLOY_URL}/api/internal/send-wa`, responseData, {
            headers: {
                [API_KEY_HEADER]: INLOOPWITH_API_KEY,
            },
        });

        return res.json(responseData);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
