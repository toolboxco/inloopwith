import { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Sticky from 'react-sticky-el';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import generateWhatsappPost from '../../src/generatePost';
import styles from '../../styles/chat.module.scss';
import dayParser from '../../src/utils/dayParser';
import Message from './message';

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const Chat = () => {
    const [messageList, setMessageList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const todayTitleRef = useRef(null);

    const fetchData = async (pageNumber) => {
        const response = await fetch(`/api/digests/${pageNumber}`);
        const data = response.json();
        return data;
    };
    const fetchMoreDataAndParse = () => {
        fetchData(page)
            .then((data) => {
                const messages = data.digests.map((digest) => ({
                    post: generateWhatsappPost(digest),
                    time: dayjs(new Date(digest.feed_date)),
                    linkPreviewData: {
                        img: digest.items[0].image || null,
                        header: `${
                            digest.items[0].name !== undefined
                                ? `${digest.items[0].name} -`
                                : ' '
                        } ${digest.items[0].title} | ${digest.tag
                            .split('_')
                            .join(' ')}`,
                        link:
                            digest.items[0].short_link ||
                            digest.items[0].original_link,
                    },
                }));

                const datePill = dayjs(new Date(data.digests[0].feed_date));

                setMessageList([
                    ...messageList,
                    ...messages,
                    {
                        type: 'DAY_PILL',
                        date: datePill,
                    },
                ]);
                setPage((page) => page + 1);
                if (!data.digests.length) {
                    setHasMore(false);
                }
            })
            .catch((e) => console.log(e));
    };
    useEffect(() => {
        fetchMoreDataAndParse();
    }, []);

    useEffect(() => {
        if (todayTitleRef.current) {
            todayTitleRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [todayTitleRef.current]);

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
                                    <div
                                        className={styles.dayTitle}
                                        ref={
                                            message.date.isToday()
                                                ? todayTitleRef
                                                : null
                                        }
                                    >
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
