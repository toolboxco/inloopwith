import Head from 'next/head';
import InfoSection from '../components/info-section';
import WhatsappDemo from '../components/whatsapp-demo';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <>
            <Head>
                <title>Inloopwith</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <main className={styles.main}>
                <InfoSection />
                <WhatsappDemo />
            </main>
        </>
    );
}
