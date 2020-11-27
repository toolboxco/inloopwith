/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import 'normalize.css';
import { DefaultSeo } from 'next-seo';
import '../styles/globals.scss';
import '../styles/iphone-frame.scss';
import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link
                    rel="icon"
                    href="/static/img/favicon.png"
                    type="image/png"
                    sizes="16x16"
                />

                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-1VDSEWHKH2"
                />
                <script
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-1VDSEWHKH2');
                        `,
                    }}
                />
            </Head>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
