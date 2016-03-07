import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';
import textToPrice from '../../../utils/textToPrice.js';
import getYear from '../../../utils/getYear';

import Card from 'material-ui/lib/card/card';
import PhotoGallery from '../../PhotoGallery/PhotoGallery.js';
/*=styles*/
// import styles from './HouseInfo.less';
if (process.env.BROWSER) {
    require('./HouseInfo.less');
}
class HouseInfo extends React.Component {
    static propTypes = {
        house: PropTypes.object.isRequired
    };

    showHouseHeader() {
        let {house} = this.props;
        let {mls, price, street, built}= house;
        let city = house.city.name;
        let type = house.type.type;
        let zip = house.zip.code;
        /*Formatter*/
        let cityFormatted = urlToText(city);
        let streetFormatted = urlToText(street);
        let typeFormatted = urlToText(type);
        let priceFormatted = textToPrice(price);
        let yearFormatted = getYear(built);
        /*String*/
        const yearText = `Year: ${yearFormatted}`;
        const mlsText = `MLS#: ${mls}`;
        const cityText = `${cityFormatted}, IL`;
        return (
            <div className={styles.row}>
                <div className={styles.col2}>
                    <div className={styles.headLeft}>
                        <h1 className={styles.address}>
                            {street && <span>{streetFormatted}</span> }
                            <br/>
                            {city && <span> {cityText} </span> }
                            {zip && <span> {zip} </span> }
                        </h1>

                        {type && <p className={styles.type}> {typeFormatted} </p> }
                    </div>
                </div>
                <div className={styles.col2}>
                    <div className={styles.headRight}>
                        {price && <h4 className={styles.price}> {priceFormatted} </h4> }
                        {mls && <p className={styles.mls}> {mlsText} </p> }
                        {built && <p className={styles.year}> {yearText} </p> }
                    </div>
                </div>
            </div>
        );
    };

    showDescription() {
        let {description} = this.props.house;
        return (
            <article className={styles.row}>
                {description &&
                <div className={styles.col1}>
                    <h4 className={styles.sectionHeader}>Description:</h4>
                    <p className={styles.description}> {description} </p>
                </div>
                }
            </article>
        );
    };

    showKeyFacts() {
        let {house} = this.props;
        let {baths, beds, price, built} = house;
        let type = house.type.type;

        /*Formatter*/
        let yearFormatted = getYear(built);
        let typeFormatted = urlToText(type);
        let priceFormatted = textToPrice(price);
        /*String*/
        const typeText = `Type: ${typeFormatted}`;
        const priceText = `Price: ${priceFormatted}`;
        const yearText = `Year Built: ${yearFormatted}`;
        const bedsText = `Beds: ${beds}`;
        const bathsText = `Baths: ${baths}`;

        return (
            <article className={styles.row}>
                <div className={styles.col1}>
                    <h4 className={styles.sectionHeader}>Key Facts:</h4>
                    <div className={styles.row}>
                        <div className={styles.col2}>
                            {type && <p> {typeText} </p> }
                            {price && <p> {priceText}</p> }
                            {built && <p> {yearText} </p> }
                        </div>
                        <div >
                            {beds && <p> {bedsText}</p> }
                            {baths && <p> {bathsText} </p> }
                        </div>
                    </div>
                </div>
            </article>

        );
    };

    render() {
        let {house} = this.props;
        let {id} = house;
        let {image} = house;
        return (
            <Card className={styles.container}>
                {this.showHouseHeader()}
                <PhotoGallery image={image} houseId={id}/>
                {this.showDescription()}
                {this.showKeyFacts()}
            </Card>
        )
    }
}
export default HouseInfo;
