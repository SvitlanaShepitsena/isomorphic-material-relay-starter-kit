import React, {PropTypes} from 'react';
import axios from 'axios';
import urlToText from '../../../utils/urlToText.js';
import textToPrice from '../../../utils/textToPrice.js';
import getYear from '../../../utils/getYear';
import settings from '../../../settings/settings.js';

/*=materialUi*/
import Card from 'material-ui/lib/card/card';
import ImageBackground from '../../Common/ImageBackground/ImageBackground.js';

/*=styles*/
import styles from './HouseTableItem.less';

class HouseTableItem extends React.Component {
    state = {
        img: ''
    };
    static propTypes = {
        house: PropTypes.object.isRequired
    };

    componentWillMount() {
        let {house} = this.props;
        let {houseDefault, cloudinaryPath} = settings;
        var imgUrl = `${cloudinaryPath}${house.id}-photo-1.jpg`;

        axios.get(imgUrl).then(response=> {
            if (response.status < 400) {
                this.setState({img: imgUrl})
            }
        }).catch(()=> {
            this.setState({img: houseDefault});
        })
    }

    showImg() {
        let {img} = this.state;
        return (
            <div className={styles.colImage}>
                <div className={styles.imageContainer}>
                    <ImageBackground imgWidth="auto" imgHeight="150" backgroundImage={img}/>
                </div>
            </div>
        );
    };

    showInfo() {
        let {house} = this.props;
        var {baths, beds, built, city, mls, price, street, type, zip} = house;
        /*Formatter*/
        let cityFormatted = urlToText(city);
        let priceFormatted = textToPrice(price);
        let streetFormatted = urlToText(street);
        let yearFormatted = getYear(built);

        /*Composed String*/
        const bathsText = `${baths} ba`;
        const bedsText = `${beds} bd`;
        const mlsText = `#${mls}`;
        const yearText = `Y: ${yearFormatted}`;
        const noYear = yearFormatted == 0;
        return (
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.cell6}>
                        <div className={styles.rowMlsAddress}>
                            <div className={styles.cellMls}>
                                {mls && <span className={styles.mls}> {mlsText} </span>}
                            </div>
                            <div className={styles.cellAddress}>
                                {street && <span> {streetFormatted} </span> }
                                {city && < span > {cityFormatted} </span> }
                                <span> IL, </span>
                                {zip && <span style={{paddingRight:5}}> {zip} </span> }
                            </div>
                        </div>
                    </div>
                    <div className={styles.cell6}>
                        <div className={styles.rowInfo}>
                            <div className={styles.cellPrice}>
                                {price && <span> {priceFormatted} </span> }
                            </div>
                            <div className={styles.cellYear}>
                                {!noYear && < span > {yearText} </span>}
                                {noYear && < span > Y: n/a </span>}
                            </div>
                            <div className={styles.cellBeds}>
                                {beds && < span > {bedsText} </span>}
                            </div>
                            <div className={styles.cellBaths}>
                                {baths && <span> {bathsText} </span> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className={styles.row} shadow={0}>
                {this.showInfo()}
            </div>
        );
    }
}
export default HouseTableItem;
