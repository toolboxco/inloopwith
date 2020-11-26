import Link from 'next/link';
import Markdown from 'markdown-to-jsx';

import styles from '../../styles/message.module.scss';

const boldRegex = /\*(.*?)\*/g;
const listRegex = /(?!:\d)\.\s/g;

const Message = (messageData) => {
    const { message } = messageData;
    const { linkPreviewData } = message;
    return (
        <div className={styles.message}>
            <Link href={linkPreviewData.link}>
                <div className={styles.preview}>
                    <span
                        style={{
                            backgroundImage: `url(${
                                linkPreviewData.img || '/static/img/hn-logo.png'
                            })`,
                        }}
                    />
                    <div>
                        <p>{linkPreviewData.header}</p>
                        <sub>{new URL(linkPreviewData.link).hostname}</sub>
                    </div>
                </div>
            </Link>
            <Markdown>
                {message.post
                    .replace(boldRegex, '<strong>$1</strong>')
                    .replace(listRegex, `\\.&nbsp;`)
                    .replace(/_fin_/g, '_fin_<br/>')
                    .replace(/(?<!<br\>)👍/gm, '\n👍&nbsp;')
                    .replace(/💬/g, '💬&nbsp;')}
            </Markdown>
            <span className={styles.datetime}>{message.time.format('LT')}</span>
        </div>
    );
};

export default Message;
