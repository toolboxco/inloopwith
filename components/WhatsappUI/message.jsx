import Link from 'next/link';
import Markdown from 'markdown-to-jsx';

import styles from '../../styles/message.module.scss';

const boldRegex = /\*(.*?)\*/g;
const listRegex = /(\d)(\.)\s/g;

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
            <Markdown options={{ forceBlock: true }}>
                {message.post
                    .replace(boldRegex, '<strong>$1</strong>')
                    .replace(listRegex, `$1\\.&nbsp;`)
                    .replace(/_fin_/g, '_fin_<br/>')
                    .replace(/(\n\n)👍/g, '<br><br>👍&nbsp;')
                    .replace(/\n👍/g, '<br>👍&nbsp;')
                    .replace(/💬/g, '💬&nbsp;')
                    .replace(/\n\n\n/g, '<br><br><br>')}
            </Markdown>
            <span className={styles.datetime}>{message.time.format('LT')}</span>
        </div>
    );
};

export default Message;
