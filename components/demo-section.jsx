import React from 'react';
import IphoneFrame from './iphone-frame';

import styles from '../styles/demoSection.module.scss';
import WhatsappUI from './WhatsappUI/whatsapp-ui';
import ArrowDownIcon from '../assets/arrow-down.svg';

const DemoSection = () => (
    <div className={styles.demoSection}>
        <div className={styles.demoInfo}>
            <h2>Get updates directly on your WhatsApp</h2>
            <ArrowDownIcon />
        </div>

        <div className={styles.blur} />
        <IphoneFrame>
            <WhatsappUI />
        </IphoneFrame>
    </div>
);

export default DemoSection;
