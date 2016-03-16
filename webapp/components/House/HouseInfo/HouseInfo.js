import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';
import textToPrice from '../../../utils/textToPrice.js';
import getYear from '../../../utils/getYear';
import _ from 'lodash';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import PhotoGallery from '../../PhotoGallery/PhotoGallery.js';

/*=styles*/
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
        debugger;

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
        return ( description &&
            <article className={styles.descriptionArticle}>
                <h4 className={styles.boldHeader}>Description:</h4>
                <p className={styles.description}> {description} </p>
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

        return (
            <article>
                <br/>
                <h4 className={styles.boldHeader}>Key Facts:</h4>
                <div className={styles.row}>
                    <div className={styles.col2}>
                        {type && <p><span className={styles.propKey}>Type: </span> {typeFormatted} </p> }
                        {price && <p><span className={styles.propKey}>Price: </span> {priceFormatted} </p> }
                        {built && <p><span className={styles.propKey}>Year Built: </span> {yearFormatted} </p> }
                    </div>
                    <div className={styles.col2}>
                        {beds && <p><span className={styles.propKey}>Beds: </span> <span> {beds} </span></p> }
                        {baths && <p><span className={styles.propKey}>Baths: </span> {baths} </p> }
                    </div>
                </div>

            </article>

        );
    };

    showExteriorDetails() {
        let {exterior} = this.house.details;
        return (exterior &&
            <article>
                <h4 className={styles.sectionHeader}>Exterior Details:</h4>
                <div className={styles.propList}>
                    {Object.keys(exterior).map(extDetail => {
                        const propKey = `${_.startCase(extDetail)}: `;
                        const propVal = `${exterior[extDetail]}`;
                        return (
                            <div key={extDetail} className={styles.propItem}>
                                <p>
                                    <span className={styles.propKey}> {propKey} </span>
                                    <span className={styles.propVal}> {propVal} </span>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </article>
        );
    };

    showInteriorDetails() {
        let {interior} = this.house.details;
        return (interior &&
            <article>
                <h4 className={styles.sectionHeader}>Interior Details:</h4>
                <div className={styles.propList}>
                    {Object.keys(interior).map(intDetail => {
                        const propKey = `${_.startCase(intDetail)}: `;
                        const propVal = `${interior[intDetail]}`;
                        return (
                            <div key={intDetail} className={styles.propItem}>
                                <p>
                                    <span className={styles.propKey}> {propKey} </span>
                                    <span className={styles.propVal}> {propVal} </span>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </article>
        );
    };

    showTaxes() {
        let {taxes} = this.house.details;
        return (taxes &&
            <article>
                <h4 className={styles.sectionHeader}>Taxes:</h4>
                <div className={styles.propList}>
                    {
                        Object.keys(taxes).map(tax => {
                            const propKey = `${_.startCase(tax)}: `;
                            const propVal = `${taxes[tax]}`;
                            return (
                                <div key={tax} className={styles.propItem}>
                                    <p>
                                        <span className={styles.propKey}> {propKey} </span>
                                        <span className={styles.propVal}> {propVal} </span>
                                    </p>
                                </div>
                            );
                        })
                    }
                </div>
            </article>
        );
    };

    showUtilities() {
        let {utilities} = this.house.details;
        return (utilities &&
            <article>
                <h4 className={styles.sectionHeader}>Utilities:</h4>
                <div className={styles.propList}>
                    {
                        Object.keys(utilities).map(util => {
                            const propKey = `${_.startCase(util)}: `;
                            const propVal = `${utilities[util]}`;
                            return (
                                <div key={util} className={styles.propItem}>
                                    <p>
                                        <span className={styles.propKey}> {propKey} </span>
                                        <span className={styles.propVal}> {propVal} </span>
                                    </p>
                                </div>
                            );
                        })
                    }
                </div>
            </article>
        );
    };

    showPublicFacts() {
        let {publicFacts} = this.house.details;
        return ( publicFacts && <article>
                <h4 className={styles.sectionHeader}>Public Facts:</h4>
                <div className={styles.propList}>
                    {Object.keys(publicFacts).map(publicFact => {
                        const propKey = `${_.startCase(publicFact)}: `;
                        const propVal = `${publicFacts[publicFact]}`;
                        return (
                            <div key={publicFact} className={styles.propItem}>
                                <p>
                                    <span className={styles.propKey}> {propKey} </span>
                                    <span className={styles.propVal}> {propVal} </span>
                                </p>
                            </div>
                        );
                    })
                    }
                </div>
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
                {this.showKeyFacts()}
                {this.showDescription()}
                {this.showExteriorDetails()}
                {this.showInteriorDetails()}
                {this.showTaxes()}
                {this.showUtilities()}
                {this.showPublicFacts()}
            </Card>
        )
    }
}
export default HouseInfo;
