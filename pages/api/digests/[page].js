import axios from 'axios';
const { DIGESTS_ENDPOINT } = process.env;

const PAGE_SIZE = 2;

export default async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(404);
    }

    const { page } = req.query;

    if (!page) {
        return res.status(400).json({ error: 'Parameter "page" is required' });
    }

    try {
        const digests = await getDigests(parseInt(page));
        return res.json({ digests });
    } catch (error) {
        console.log(error);
    }
};

const getDigests = async (pageNumber) => {
    try {
        const response = await axios.get(
            `${DIGESTS_ENDPOINT}/?skip=${
                PAGE_SIZE * pageNumber
            }&limit=${PAGE_SIZE}`,
        );
        return response.data;
    } catch (_) {
        console.log('Error fetching digests');
    }
};
