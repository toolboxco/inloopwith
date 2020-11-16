import styles from '../../styles/chat.module.css';

const Chat = ({ messages }) => {
    return (
        <div className={styles.chat}>
            {messages.map((message) => (
                <div className={styles.message}>
                    {message}
                    <span>4.21 AM</span>
                </div>
            ))}
        </div>
    );
};

export default Chat;
