import Head from 'next/head';
import Sticky from 'react-sticky-el';
import DemoSection from '../components/demo-section';
import Heading from '../components/heading';
import InfoSection from '../components/info-section';
import Cta from '../components/cta';
import Testimonials from '../components/Testimonials/testimonials-section';
import styles from '../styles/Home.module.scss';

export default function Home() {
    return (
        <>
            <Head>
                <title>In loop</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <header>
                <Sticky
                    disabled={
                        typeof window !== 'undefined' &&
                        window.innerWidth > 1000
                    }
                    stickyClassName={styles.navSticky}
                >
                    <nav className={styles.nav}>
                        <span className={styles.brandTitle}>Inloop</span>
                        <a
                            className={styles.cta}
                            href="https://chat.whatsapp.com/FLb2EM3MZqbJeZpOuhxluX"
                        >
                            <strong>Join group ⚡️</strong>
                        </a>
                    </nav>
                </Sticky>
                <Heading />
            </header>

            <main className={styles.main}>
                <InfoSection />
                <DemoSection />
            </main>

            <Testimonials />

            <div className={styles.main}>
                <Cta text="Click the button already 👉" />
            </div>

            <footer className={styles.footer}>
                <p>
                    &copy; toolbox co 2020{' '}
                    <a href="mailto:me@aakashgoel.com">Contact</a>{' '}
                </p>
                <p className={styles.terms}>
                    <i>
                        This service is provided under an "as is" condition. It
                        might change or could be discontinued without any prior
                        notice. The maker of this service can't be held liable
                        in any way for any reason.
                    </i>
                </p>
            </footer>
        </>
    );
}
