import React from 'react';
import IphoneFrame from './iphone-frame';

import styles from '../styles/whatsappDemo.module.css';
import WhatsappUI from './whatsapp-ui';

const WhatsappDemo = () => (
    <div className={styles.whatsappDemo}>
        <IphoneFrame>
            <WhatsappUI />
        </IphoneFrame>
    </div>
);

export default WhatsappDemo;
