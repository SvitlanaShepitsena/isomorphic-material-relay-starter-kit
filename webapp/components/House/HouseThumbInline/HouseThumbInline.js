import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';
import textToPrice from '../../../utils/textToPrice.js';
import getYear from '../../../utils/getYear';
import settings from '../../../settings/settings.js';

/*=materialUi*/
import Card from 'material-ui/lib/card/card';
import ImageBackground from '../../Common/ImageBackground/ImageBackground.js';

/*=styles*/
import styles from './HouseThumbInline.less';

class HouseThumbInline extends React.Component {
    static propTypes = {
        house: PropTypes.object.isRequired
    };

    showImg() {
        var {houseDefault, cloudinaryPath} = settings;
        let {house} = this.props;
        var {mls, street} = house;
        var image = cloudinaryPath + house.id + '-photo-1.jpg';
        var city = house.city.name;
        var zip = house.zip.code;
        var type = house.type.type;
        /*Formatter*/
        let cityFormatted = urlToText(city);
        let streetFormatted = urlToText(street);
        let typeFormatted = urlToText(type);

        const listingAlt = `${typeFormatted} for sale: ${mls} ${streetFormatted} ${cityFormatted}, IL ${zip}`;

        return (
            <div className={styles.colImage}>
                <div className={styles.imageContainer}>
                    {image && <ImageBackground imgWidth="auto" imgHeight="150" backgroundImage={image}/> }
                    {!image &&
                    <img className={styles.image} src={houseDefault} alt={listingAlt}/> }
                </div>
            </div>
        );
    };

    showInfo() {
        let {house} = this.props;
        var {baths, beds, mls, price, street, built} = house;
        var city = house.city.name;
        var zip = house.zip.code;
        var type = house.type.type;
        /*Formatter*/
        let cityFormatted = urlToText(city);
        let priceFormatted = textToPrice(price);
        let streetFormatted = urlToText(street);
        let typeFormatted = urlToText(type);
        let yearFormatted = getYear(house.built);
        /*Composed String*/
        const bathsText = ` | Baths: ${baths}`;
        const bedsText = `Beds: ${beds}`;
        const mlsText = ` | MLS#: ${mls}`;
        const yearText = `Year: ${yearFormatted}`;
        return (
            <div className={styles.colInfo}>
                <h4 className={styles.address}>
                    {street && <span> {streetFormatted} </span> }
                        <span className={styles.address2}>
                        {city && < span > {cityFormatted} </span> }
                            <span> IL, </span>
                            {zip && <span> {zip} </span> }
                        </span>
                </h4>
                <h3 className={styles.price}>
                    {price && <span> {priceFormatted} </span> }
                </h3>
                <p >
                    {type && <span className={styles.type}> {typeFormatted}</span> }
                    {mls && <span className={styles.mls}> {mlsText} </span>}
                </p>
                <p>
                    {beds && < span > {bedsText} </span>}
                    {baths && <span> {bathsText} </span> }
                </p>
                <p>
                    {built && < span className={styles.year}> {yearText} </span>}
                </p>
            </div>
        );
    };

    render() {
        return (
            <Card className={styles.row} shadow={0}>
                {this.showImg()}
                {this.showInfo()}
            </Card>
        );
    }
}
export default HouseThumbInline;
