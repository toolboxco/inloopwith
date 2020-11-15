import styles from '../styles/infoSection.module.css';

const InfoSection = () => (
    <div className={styles.infoSection}>
        <h1>in loop with tech</h1>
        <h3>{`💡 What is this?`}</h3>
        <p>
            {`an `}
            <strong>{`automated daily newsletter`}</strong>
            {` consisting of best tech discussions from Hacker News and top product launches on Product Hunt. This short digest consists of —`}
        </p>
        <ul>
            <li>{`top 5 voted product launches on PH with links and excerpts`}</li>
            <li>{`top 10 HN threads (100 upvotes and above) with links and excerpts`}</li>
        </ul>
        <h3>{`⚡️ Schedule`}</h3>
        <ul>
            <li>
                {`newsletter sent as crisp and beautifully crafted `}
                <a
                    {...{
                        href:
                            'https://twitter.com/aakashlpin/status/1320767245081952257',
                    }}
                >{`WhatsApp posts`}</a>
                {`.`}
            </li>
            <li>{`sent 5 days a week (M-F) at 10am IST.`}</li>
        </ul>
        <h3>{`😀 How do I join?`}</h3>
        <p>
            <a
                {...{
                    href: 'https://chat.whatsapp.com/FLb2EM3MZqbJeZpOuhxluX',
                }}
            >{`Click here`}</a>
            {` to join.`}
        </p>
        <h3>{`💯 Does it cost?`}</h3>
        <p>
            {`100% FREE for students, underpaid and/or underrepresented tech groups. For everyone else, you can `}
            <a
                {...{
                    href: 'https://www.buymeacoffee.com/aakashgoel',
                }}
            >{`buy me a coffee`}</a>
            {` once you find enough value from the newsletters. No pressure!`}
        </p>
        <h3>{`👋🏽  Who's running this?`}</h3>
        <p>
            {`I'm `}
            <a
                {...{
                    href: 'https://aakashgoel.me',
                }}
            >{`Aakash Goel`}</a>
            {`. I'm on a quest to reclaim my time from "feeds". I follow exactly 0 people on Twitter. Part of the motivation behind creating this was to stop frequenting Hacker News and Product Hunt several times a day like an addict. Join in and de-addict.`}
        </p>
    </div>
);

export default InfoSection;
