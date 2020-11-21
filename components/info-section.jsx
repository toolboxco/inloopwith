import React from 'react';
import styles from '../styles/infoSection.module.css';

const InfoSection = () => (
    <div className={styles.infoSection}>
        <h1>in loop with tech</h1>
        <p>
            {`a `}
            <strong>daily digest</strong>
            {` containing top threads from Hacker News and top product launches on Product Hunt. It summarises —`}
        </p>
        <ul>
            <li>top 5 voted product launches on PH with links and excerpts</li>
            <li>
                top 10 HN threads (100 upvotes and above) with links and
                excerpts
            </li>
        </ul>
        <br />
        <h3>⚡️ Schedule</h3>
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
            <li>sent 5 days a week (M-F) at 10am IST.</li>
        </ul>
        <p>
            <a
                {...{
                    href: 'https://chat.whatsapp.com/FLb2EM3MZqbJeZpOuhxluX',
                }}
            >
                Click here
            </a>
            {` to join the WhatsApp group.`}
        </p>
        <br />
        <h3>💯 Pricing</h3>
        <p>
            {`100% FREE for students, underpaid and/or underrepresented tech groups. For everyone else, you can `}
            <a
                {...{
                    href: 'https://www.buymeacoffee.com/aakashgoel',
                }}
            >
                buy me a coffee
            </a>
            {` once you find enough value from the newsletters. No pressure!`}
        </p>
        <br />
        <h3>👋🏽 Hello</h3>
        <p>
            {`I'm `}
            <a href="https://aakashgoel.me" target="_blank" rel="noreferrer">
                Aakash Goel
            </a>
            . I&apos;m on a quest to reclaim my time from &quot;feeds&quot;. I
            follow exactly 0 people on{' '}
            <a
                href="https://twitter.com/aakashlpin"
                target="_blank"
                rel="noreferrer"
            >
                Twitter
            </a>
            . Part of the motivation behind creating this was to stop
            frequenting Hacker News and Product Hunt several times a day like an
            addict. Join in and de-addict.
        </p>
    </div>
);

export default InfoSection;
