import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import generateWhatsappPost from '../../src/generatePost';
import Markdown from 'markdown-to-jsx';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

import styles from '../../styles/chat.module.css';

const boldRegex = /\*(.*?)\*/g;
const listRegex = /(?<=\d)\.\s/gm;

const Chat = () => {
    const [messageList, setMessageList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
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
                }));

                setMessageList([...messageList].concat(messages));
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
    return (
        <div className={styles.chat} id="scrollableDiv">
            <InfiniteScroll
                dataLength={messageList.length}
                next={fetchMoreDataAndParse}
                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                inverse={true}
                hasMore={hasMore}
                loader={
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                }
                scrollableTarget="scrollableDiv"
            >
                {messageList.map((message, index) => {
                    const nextDate = messageList[index + 1]?.time;
                    return (
                        <div className={styles.wrapper} key={index}>
                            {!nextDate?.isSame(message.time) && (
                                <div className={styles.dayTitle}>
                                    {message.time.isToday()
                                        ? 'Today'
                                        : message.time.isYesterday()
                                        ? 'Yesterday'
                                        : message.time.format(' DD MMM')}
                                </div>
                            )}
                            <div className={styles.message}>
                                <Markdown>
                                    {message.post
                                        .replace(
                                            boldRegex,
                                            '<strong>$1</strong>',
                                        )
                                        .replace(listRegex, `\\.&nbsp;`)
                                        .replace(/_fin_/g, '_fin_<br/>')
                                        .replace( /(?<!<br\>)👍/gm, '\n👍')}
                                </Markdown>
                                <span>{message.time.format('LT')}</span>
                            </div>
                        </div>
                    );
                })}
            </InfiniteScroll>
        </div>
    );
};

export default Chat;
