import axios from 'axios';
import dayjs from 'dayjs';

const { DIGESTS_ENDPOINT } = process.env;

const getDigests = async (skipCount = 0) => {
    try {
        const response = await axios.get(
            `${DIGESTS_ENDPOINT}/?sort=-feed_date&skip=${skipCount}`,
        );
        return response.data;
    } catch (_) {
        console.log('Error fetching digests');
        return null;
    }
};

export default async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(404).send('Not found');
    }

    const { nextPageToken: reqNextPageToken = 0 } = req.query;
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(reqNextPageToken)) {
        return res.status(400).send('Bad request');
    }

    if (reqNextPageToken && Number(reqNextPageToken) < 0) {
        return res.json({
            digests: [],
            nextPageToken: -1,
        });
    }

    const nextPageToken = Number(reqNextPageToken);

    try {
        const digests = await getDigests(Number(nextPageToken));
        const pageDigests = digests.map((item) => ({
            ...item,
            formattedDate: dayjs(new Date(item.feed_date)).format('DD/MM/YYYY'),
        }));
        const firstDate = pageDigests[0].formattedDate;
        const filteredDigests = pageDigests.filter(
            ({ formattedDate }) => formattedDate === firstDate,
        );
        const nextPageChangeIndex = pageDigests.findIndex(
            ({ formattedDate }) => formattedDate !== firstDate,
        );

        const nextNextPageToken = nextPageToken
            ? Number(nextPageToken) + nextPageChangeIndex
            : nextPageChangeIndex;

        return res.json({
            digests: filteredDigests,
            nextPageToken: !nextPageToken
                ? nextNextPageToken
                : nextNextPageToken > nextPageToken
                ? nextNextPageToken
                : -1,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
