import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import styles from '../styles/heading.module.scss';

const TextTransition = dynamic(() => import('react-text-transition'), {
    ssr: false,
});

const TEXTS = [
    'Hacker News thread',
    'Product Hunt Launch',
    '/r/worldnews thread',
    '/r/technology thread',
    '/r/Futurology thread',
];

const Heading = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            3000,
        );
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.heading}>
            Never miss a top
            <TextTransition
                text={TEXTS[index % TEXTS.length]}
                springConfig={{ mass: 1, tension: 280, friction: 10 }}
                className={styles.animated}
                inline
                noOverflow
                direction="up"
            />
        </div>
    );
};

export default Heading;
