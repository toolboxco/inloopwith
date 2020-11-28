import React from 'react';
import styles from '../styles/infoSection.module.scss';

export default function Cta({ text = 'Click for Instant access ⚡️' }) {
    return (
        <div>
            <strong>
                <a
                    className={styles.cta}
                    href="https://chat.whatsapp.com/FLb2EM3MZqbJeZpOuhxluX"
                >
                    {text}
                </a>
            </strong>
        </div>
    );
}
