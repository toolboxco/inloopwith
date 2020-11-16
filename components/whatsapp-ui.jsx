import styles from '../styles/whatsappUI.module.css';
import NetworkIcon from '../assets/network.svg';
import WifiIcon from '../assets/wifi.svg';
import BatteryIcon from '../assets/battery.svg';

const WhatsappUI = () => {
    return (
        <div className={styles.WhatsappUI}>
            <div className={styles.statusBar}>
                <div className={styles.time}>11.50</div>
                <div className={styles.icons}>
                    <NetworkIcon />
                    <WifiIcon />
                    <BatteryIcon />
                </div>
            </div>
        </div>
    );
};

export default WhatsappUI;
