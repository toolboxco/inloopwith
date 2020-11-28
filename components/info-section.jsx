import React from 'react';
import Cta from './cta';
import styles from '../styles/infoSection.module.scss';

const InfoSection = () => (
    <div className={styles.infoSection}>
        <div className={styles.showOnMobile}>
            <Cta />
        </div>
        <div style={{ marginBottom: '2rem' }}>
            <h1>Best of tech — Delivered as a DM</h1>
            <p>
                {`a `}
                <strong>beautiful WhatsApp digest</strong>
                {` with links and excerpts from the 2 most popular tech sources on the Internet. This daily digest consists of  —`}
            </p>
            <ul>
                <li>top 5 product launches from Product Hunt, and</li>
                <li>
                    upto 10 Hacker News threads — at least 100 upvotes or above
                </li>
            </ul>
        </div>
        <div style={{ marginBottom: '2rem' }}>
            <h3>Schedule</h3>
            <ul>
                <li>
                    digests sent as crisp and beautifully crafted WhatsApp
                    posts.
                </li>
                <li>sent all days a week by 10am IST.</li>
            </ul>
        </div>
        <div id="pricing" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Pricing</h3>
            <p>
                100% FREE for students, underpaid and/or underrepresented tech
                groups. <br />
                <br /> For everyone else, you can{' '}
                <a href="https://www.buymeacoffee.com/aakashgoel">
                    buy me a coffee
                </a>{' '}
                once you find enough value from the digests. No pressure!
            </p>
            <Cta text="Get In NOW! ✨" />
        </div>
        <h3>Hello,</h3>
        <p style={{ marginBottom: '1rem' }}>
            {`I'm `}
            <a href="https://aakashgoel.me" target="_blank" rel="noreferrer">
                Aakash Goel
            </a>
            . This product is an effort to reclaim my time from
            &ldquo;feeds&rdquo;. <br />
            <br />
            Join in NOW and then come say Hi on Product Hunt! 💪🏽
        </p>
        <p>
            <a
                href="https://www.producthunt.com/posts/in-loop?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-in-loop"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=276142&theme=light"
                    alt="In loop - Best of tech — Delivered as a WhatsApp DM! | Product Hunt"
                    className={styles.phBadge}
                    width="250"
                    height="54"
                />
            </a>
        </p>
    </div>
);

export default InfoSection;
