import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import styles from '../../styles/whatsappUI.module.scss';
import NetworkIcon from '../../assets/network.svg';
import WifiIcon from '../../assets/wifi.svg';
import BatteryIcon from '../../assets/battery.svg';
import BackIcon from '../../assets/back-arrow.svg';
import PhoneIcon from '../../assets/phone.svg';
import Chat from './chat';

const WhatsappUI = () => {
    const getTime = () => dayjs(new Date()).format('HH:mm');
    const [time, setTime] = useState(() => getTime());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getTime());
        }, 1 * 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.whatsappUI}>
            <div className={styles.statusBar}>
                <div className={styles.time}>{time}</div>
                <div className={styles.icons}>
                    <NetworkIcon />
                    <WifiIcon />
                    <BatteryIcon />
                </div>
            </div>
            <div className={styles.waHeader}>
                <BackIcon />
                <img src="/static/img/logo.png" alt="Inloop" />
                <div>
                    <h2>Inloop</h2>
                </div>
                <PhoneIcon />
            </div>
            <Chat /* display: none; */ />
            <div className={styles.input}>
                Only <span>admins</span> can send messages
            </div>
        </div>
    );
};

export default WhatsappUI;
