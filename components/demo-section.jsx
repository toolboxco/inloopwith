import React from 'react';
import IphoneFrame from './iphone-frame';

import styles from '../styles/demoSection.module.css';
import WhatsappUI from './WhatsappUI/whatsapp-ui';

const DemoSection = () => (
    <div className={styles.demoSection}>
        <IphoneFrame>
            <WhatsappUI />
        </IphoneFrame>
    </div>
);

export default DemoSection;
