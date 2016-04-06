import React, {PropTypes} from 'react';
import settings from '../../settings/settings.js';
import styles from './Brokers.less';
import ImageBackground from '../Common/ImageBackground/ImageBackground.js';
import _ from 'lodash';

class Brokers extends React.Component {
    static propTypes = {};

    oneBroker() {
        return (
            <div>
                <img src="" alt=""/>
                <h3>Broker Name</h3>
                <H4>BROKER PHONE</H4>
            </div>
        )

    };

    showStars() {
        return (
            <div className={styles.stars}>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
            </div>
        )

    };

    render() {
        let brokersUrl = settings.brokersUrl;
        let brokers = settings.brokers.ids;
        let names = settings.brokers.names;

        const broker1 = `${brokersUrl}/${brokers.id1}.jpg`
        const broker2 = `${brokersUrl}/${brokers.id2}.jpg`
        const broker3 = `${brokersUrl}/${brokers.id3}.jpg`
        const broker4 = `${brokersUrl}/${brokers.id4}.png`
        const broker5 = `${brokersUrl}/${brokers.id5}.jpg`
        const broker6 = `${brokersUrl}/${brokers.id6}.jpg`
        const broker7 = `${brokersUrl}/${brokers.id7}.jpg`
        const broker8 = `${brokersUrl}/${brokers.id8}.jpg`
        const broker9 = `${brokersUrl}/${brokers.id9}.jpg`
        const broker10 = `${brokersUrl}/${brokers.id10}.jpg`
        const broker11 = `${brokersUrl}/${brokers.id11}.jpg`
        const broker12 = `${brokersUrl}/${brokers.id12}.jpg`
        const broker13 = `${brokersUrl}/${brokers.id13}.jpg`
        return (
            <div className={styles.container}>
                <h2>Call us for a free consultation!</h2>
                <div className={styles.brokerCard}>
                    <div className={styles.imgContainer}>
                        <ImageBackground imgWidth="auto" imgHeight="115" backgroundImage={broker1}/>
                    </div>
                    <div className={styles.brokerInfo}>
                        <h3>{names.n1}</h3>
                        {this.showStars()}
                        <h4>{settings.companyPhone}</h4>
                    </div>
                </div>
                <div className={styles.brokerCard}>
                    <div className={styles.imgContainer}>
                        <ImageBackground imgWidth="auto" imgHeight="115" backgroundImage={broker3}/>
                    </div>
                    <div className={styles.brokerInfo}>
                        <h3>{names.n3}</h3>
                        {this.showStars()}
                        <h4>{settings.companyPhone}</h4>
                    </div>
                </div>
                <div className={styles.brokerCard}>
                    <div className={styles.imgContainer}>
                        <ImageBackground imgWidth="auto" imgHeight="115" backgroundImage={broker4}/>
                    </div>
                    <div className={styles.brokerInfo}>
                        <h3>{names.n4}</h3>
                        {this.showStars()}
                        <h4>{settings.companyPhone}</h4>
                    </div>
                </div>
                <div className={styles.brokerCard}>
                    <div className={styles.imgContainer}>
                        <ImageBackground imgWidth="auto" imgHeight="115" backgroundImage={broker5}/>
                    </div>
                    <div className={styles.brokerInfo}>
                        <h3>{names.n5}</h3>
                        {this.showStars()}
                        <h4>{settings.companyPhone}</h4>
                    </div>
                </div>
                <div className={styles.brokerCard}>
                    <div className={styles.imgContainer}>
                        <ImageBackground imgWidth="auto" imgHeight="115" backgroundImage={broker6}/>
                    </div>
                    <div className={styles.brokerInfo}>
                        <h3>{names.n6}</h3>
                        {this.showStars()}
                        <h4>{settings.companyPhone}</h4>
                    </div>
                </div>
                <div className={styles.brokerCard}>
                    <div className={styles.imgContainer}>
                        <ImageBackground imgWidth="auto" imgHeight="115" backgroundImage={broker7}/>
                    </div>
                    <div className={styles.brokerInfo}>
                        <h3>{names.n7}</h3>
                        {this.showStars()}
                        <h4>{settings.companyPhone}</h4>
                    </div>
                </div>
                <div className={styles.brokerCard}>
                    <div className={styles.imgContainer}>
                        <ImageBackground imgWidth="auto" imgHeight="115" backgroundImage={broker8}/>
                    </div>
                    <div className={styles.brokerInfo}>
                        <h3>{names.n8}</h3>
                        {this.showStars()}
                        <h4>{settings.companyPhone}</h4>
                    </div>
                </div>
                <div className={styles.brokerCard}>
                    <div className={styles.imgContainer}>
                        <ImageBackground imgWidth="auto" imgHeight="115" backgroundImage={broker10}/>
                    </div>
                    <div className={styles.brokerInfo}>
                        <h3>{names.n10}</h3>
                        {this.showStars()}
                        <h4>{settings.companyPhone}</h4>
                    </div>
                </div>
                <div className={styles.brokerCard}>
                    <div className={styles.imgContainer}>
                        <ImageBackground imgWidth="auto" imgHeight="115" backgroundImage={broker11}/>
                    </div>
                    <div className={styles.brokerInfo}>
                        <h3>{names.n11}</h3>
                        {this.showStars()}
                        <h4>{settings.companyPhone}</h4>
                    </div>
                </div>
                <div className={styles.brokerCard}>
                    <div className={styles.imgContainer}>
                        <ImageBackground imgWidth="auto" imgHeight="115" backgroundImage={broker12}/>
                    </div>
                    <div className={styles.brokerInfo}>
                        <h3>{names.n12}</h3>
                        {this.showStars()}
                        <h4>{settings.companyPhone}</h4>
                    </div>
                </div>
                <div className={styles.brokerCard}>
                    <div className={styles.imgContainer}>
                        <ImageBackground imgWidth="auto" imgHeight="115" backgroundImage={broker13}/>
                    </div>
                    <div className={styles.brokerInfo}>
                        <h3>{names.n13}</h3>
                        {this.showStars()}
                        <h4>{settings.companyPhone}</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default Brokers;