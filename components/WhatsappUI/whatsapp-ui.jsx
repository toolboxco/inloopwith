import styles from '../../styles/whatsappUI.module.css';
import NetworkIcon from '../../assets/network.svg';
import WifiIcon from '../../assets/wifi.svg';
import BatteryIcon from '../../assets/battery.svg';
import BackIcon from '../../assets/back-arrow.svg';
import PhoneIcon from '../../assets/phone.svg';
import Chat from './chat';

const WhatsappUI = () => {
    // fetch('/api/digests/1')
    //     .then((res) => res.json())
    //     .then((data) => console.log(data));

    return (
        <div className={styles.whatsappUI}>
            <div className={styles.statusBar}>
                <div className={styles.time}>11.50</div>
                <div className={styles.icons}>
                    <NetworkIcon />
                    <WifiIcon />
                    <BatteryIcon />
                </div>
            </div>
            <div className={styles.waHeader}>
                <BackIcon />
                <img src="/static/img/logo.png" alt="inloopwith" />
                <div>
                    <h2>In loop with Tech</h2>
                    <sub>+ 1 (416) 877-453, +1 (424) 543-939...</sub>
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
