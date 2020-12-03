import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Sticky from 'react-sticky-el';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import generateWhatsappPost from '../../src/generatePost';
import styles from '../../styles/chat.module.scss';
import dayParser from '../../src/utils/dayParser';
import createDigestItems from '../../src/utils/createDigestItems';
import Message from './message';

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const Chat = () => {
    const [messageList, setMessageList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [nextPageToken, setNextPageToken] = useState(null);

    const fetchData = async () => {
        const response = await fetch(
            `/api/digests${
                nextPageToken ? `?nextPageToken=${nextPageToken}` : ''
            }`,
        );
        const data = response.json();
        return data;
    };

    const fetchMoreDataAndParse = async () => {
        const data = await fetchData(nextPageToken);
        const { digests } = data;
        const digestItems = createDigestItems(digests);

        if (!digestItems.length) {
            return;
        }

        const firstDigestItem = digestItems[0];
        const feedDate = digests[0].feed_date;
        const time = dayjs(new Date(feedDate));

        const post = generateWhatsappPost({
            items: digestItems,
            feed_date: feedDate,
        });
        const linkPreviewData = {
            img: firstDigestItem.image || null,
            header: `${
                firstDigestItem.name !== undefined
                    ? `${firstDigestItem.name} -`
                    : ' '
            } ${firstDigestItem.title}}`,
            link: firstDigestItem.short_link || firstDigestItem.original_link,
        };

        setMessageList([
            ...messageList,
            {
                post,
                time,
                linkPreviewData,
            },
            {
                type: 'DAY_PILL',
                date: time,
            },
        ]);
        setNextPageToken(data.nextPageToken);
        if (data.nextPageToken === -1) {
            setHasMore(false);
        }
    };
    useEffect(() => {
        fetchMoreDataAndParse();
    }, []);

    return (
        <div className={styles.chat} id="scrollableDiv">
            <InfiniteScroll
                dataLength={messageList.length}
                next={fetchMoreDataAndParse}
                style={{ display: 'flex', flexDirection: 'column-reverse' }} // To put endMessage and loader to the top.
                inverse
                hasMore={hasMore}
                loader={
                    <div className="lds-ring">
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                }
                scrollableTarget="scrollableDiv"
            >
                {messageList.map((message, index) => {
                    // const nextDate = messageList[index + 1]?.time;
                    if (message.type === 'DAY_PILL') {
                        return (
                            <div
                                className={styles.wrapper}
                                key={dayParser(message.date)}
                            >
                                <Sticky
                                    scrollElement="#scrollableDiv"
                                    positionRecheckInterval={250}
                                    stickyStyle={{ zIndex: 1000 - index }}
                                >
                                    <div className={styles.dayTitle}>
                                        {dayParser(message.date)}
                                    </div>
                                </Sticky>
                            </div>
                        );
                    }

                    return (
                        <div
                            className={styles.wrapper}
                            // eslint-disable-next-line react/no-array-index-key
                            key={`${dayParser(message.time)}_message_${index}`}
                        >
                            <Message message={message} />
                        </div>
                    );
                })}
            </InfiniteScroll>
        </div>
    );
};

export default Chat;
