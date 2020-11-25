import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const TextTransition = dynamic(() => import('react-text-transition'), {
    ssr: false,
});

import styles from '../styles/heading.module.scss';

const TEXTS = ['Hacker News thread', 'Product Hunt Launch'];

const Heading = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            5000,
        );
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.heading}>
            Never miss a top
            <TextTransition
                text={TEXTS[index % TEXTS.length]}
                springConfig={{ mass: 1, tension: 280, friction: 100 }}
                className={styles.animated}
                inline
                noOverflow
                direction="down"
            />
        </div>
    );
};

export default Heading;
