import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from '../../styles/chat.module.css';

const Chat = () => {
    const [itemsList, setItemsList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const fetchData = async (pageNumber) => {
        const response = await fetch(
            `https://jsonbox.io/box_2db4e044aaebfee9e161/posts?skip=${
                5 * pageNumber
            }&limit=${5}`,
        );
        const data = response.json();
        return data;
    };
    const fetchMoreData = () => {
        fetchData(page).then((data) => {
            setItemsList([...itemsList].concat(data));
            setPage((page) => page + 1);
            if (!data.length) {
                setHasMore(false);
            }
            console.log(itemsList);
        });
    };

    useEffect(() => {
        fetchMoreData();
    }, []);
    return (
        <div className={styles.chat} id="scrollableDiv">
            <InfiniteScroll
                dataLength={itemsList.length}
                next={fetchMoreData}
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
                {itemsList.map((item, index) => (
                    <div className={styles.message} key={index}>
                        {item.body}
                        <span>4.21 AM</span>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default Chat;
