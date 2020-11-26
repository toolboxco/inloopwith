import React from 'react';
import styles from '../styles/infoSection.module.scss';

const InfoSection = () => (
    <div className={styles.infoSection}>
        <div style={{ marginBottom: '2rem' }}>
            <h1>Best of tech — Delivered as a DM</h1>
            <p>
                {`a `}
                <strong>beautiful WhatsApp digest</strong>
                {` with links and excerpts from the Internet's most popular tech sources. This daily digest consists of  —`}
            </p>
            <ul>
                <li>top 5 product launches from Product Hunt, and</li>
                <li>
                    upto 10 Hacker News threads — only 100 upvotes and above
                </li>
            </ul>
        </div>
        <div style={{ marginBottom: '2rem' }}>
            <h3>Schedule</h3>
            <ul>
                <li>
                    {`newsletter sent as crisp and beautifully crafted `}
                    <a
                        {...{
                            href:
                                'https://twitter.com/aakashlpin/status/1320767245081952257',
                        }}
                    >
                        WhatsApp posts
                    </a>
                    .
                </li>
                <li>
                    sent 5 days a week (M-F) by 10am IST (Indian Standard Time).
                </li>
            </ul>
        </div>
        <div id="pricing" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Pricing</h3>
            <p>
                ⚡️ Cyber week offer — <br />
                <span style={{ textDecoration: 'line-through' }}>
                    $25/year
                </span>{' '}
                <strong>only $9/year</strong>! (that&apos;s right — per
                &ldquo;year&rdquo;) <br />{' '}
            </p>
            <div>
                <strong>
                    <a
                        className={styles.cta}
                        type="button"
                        href="https://www.buymeacoffee.com/aakashgoel/e/11075"
                    >
                        I want this!
                    </a>
                </strong>
            </div>

            <p>
                <i>
                    <a href="mailto:me@aakashgoel.com">
                        Student? Get your access for free! Just send me an email
                        with your phone #
                    </a>
                </i>
            </p>
        </div>
        <h3>Hello,</h3>
        <p>
            {`I'm `}
            <a href="https://aakashgoel.me" target="_blank" rel="noreferrer">
                Aakash Goel
            </a>
            . This product is an effort to reclaim my time from
            &ldquo;feeds&rdquo;. Join in! 💪🏽
        </p>
    </div>
);

export default InfoSection;
