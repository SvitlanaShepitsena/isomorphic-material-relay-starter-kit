import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';
import textToPrice from '../../../utils/textToPrice.js';
import getYear from '../../../utils/getYear';
import _ from 'lodash';

import Card from 'material-ui/lib/card/card';
import PhotoGallery from '../../PhotoGallery/PhotoGallery.js';
import styles from './HouseInfo.less';

class HouseInfo extends React.Component {
    static propTypes = {
        house: PropTypes.object.isRequired
    };

    componentWillReceiveProps(nextProps) {
        let {house} = nextProps;
        house.details = house.details ? JSON.parse(house.details) : null;
        this.house = house;
    };

    componentWillMount() {
        let {house} = this.props;
        house.details = house.details ? JSON.parse(house.details) : null;
        this.house = house;
    };

    showHouseHeader() {
        let {house} = this;
        let {built, city, mls, price, street, type, zip}= house;
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
        let {description} = this.house;
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
        let {house} = this;
        let {baths, beds, built, price, type} = house;

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
                        <div className={styles.col2}>
                            {beds && <p> {bedsText}</p> }
                            {baths && <p> {bathsText} </p> }
                        </div>
                    </div>
                </div>
            </article>

        );
    };

    showExteriorDetails() {
        let {exterior} = this.house.details;
        return (
            <div className={styles.row}>
                {exterior &&
                <div className={styles.col1}>
                    <h4 className={styles.sectionHeader}>Exterior Details:</h4>
                    <div className={styles.propList}>
                        {
                            Object.keys(exterior).map(extDetail => {
                                const propKey = `${_.startCase(extDetail)}: `;
                                const propVal = `${exterior[extDetail]}`;
                                return (
                                    <div key={extDetail} className={styles.propItem}>
                                        <span className={styles.propKey}> {propKey} </span>
                                        <span className={styles.propVal}> {propVal} </span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                }
            </div>
        );
    };

    showInteriorDetails() {
        let {interior} = this.house.details;
        return (
            <article className={styles.row}>
                {interior &&
                <div className={styles.col1}>
                    <h4 className={styles.sectionHeader}>Exterior Details:</h4>
                    <div className={styles.propList}>
                        {
                            Object.keys(interior).map(intDetail => {
                                const propKey = `${_.startCase(intDetail)}: `;
                                const propVal = `${interior[intDetail]}`;
                                return (
                                    <div key={intDetail} className={styles.propItem}>
                                        <p>
                                            <span className={styles.propKey}> {propKey} </span> <span
                                            className={styles.propVal}> {propVal} </span>
                                        </p>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                }
            </article>
        );
    };

    render() {
        let {house} = this;
        let {id} = house;
        let {image} = house;
        return (
            <Card className={styles.container}>
                {this.showHouseHeader()}
                <PhotoGallery image={image} houseId={id}/>
                {this.showDescription()}
                {this.showKeyFacts()}
                {this.showExteriorDetails()}
                {this.showInteriorDetails()}
            </Card>
        )
    }
}
export default HouseInfo;
