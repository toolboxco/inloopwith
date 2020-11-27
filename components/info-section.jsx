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
                    digests sent as crisp and beautifully crafted WhatsApp
                    posts. Check out the WhatsApp window on this page!
                </li>
                <li>
                    sent 5 days a week (M-F) by 10am IST (Indian Standard Time).
                </li>
            </ul>
        </div>
        <div id="pricing" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Pricing</h3>
            <p>
                100% FREE for students, underpaid and/or underrepresented tech
                groups. For everyone else, you can{' '}
                <a href="https://www.buymeacoffee.com/aakashgoel">
                    buy me a coffee
                </a>{' '}
                once you find enough value from the digests. No pressure!
            </p>
            <div>
                <strong>
                    <a
                        className={styles.cta}
                        type="button"
                        href="https://chat.whatsapp.com/FLb2EM3MZqbJeZpOuhxluX"
                    >
                        Claim your FREE Access!
                    </a>
                </strong>
            </div>
        </div>
        <h3>Hello,</h3>
        <p>
            {`I'm `}
            <a href="https://aakashgoel.me" target="_blank" rel="noreferrer">
                Aakash Goel
            </a>
            . This product is an effort to reclaim my time from
            &ldquo;feeds&rdquo;. Soon enough, you&apos;d be able to personalize
            and customize this feed with more sources! Join in today! 💪🏽
        </p>
    </div>
);

export default InfoSection;
