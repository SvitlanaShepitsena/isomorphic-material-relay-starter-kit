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
        house: PropTypes.object.isRequired,
        inlineImgClass: PropTypes.string
    };

    render() {
        var {houseDefault, cloudinaryPath} = settings;

        let {house} = this.props;
        var {baths, beds, mls, price, street, built} = house;
        var city = house.city.name;
        var zip = house.zip.code;
        var type = house.type.type;

        /*Formatter*/
        let yearFormatted = getYear(house.built);
        let cityFormatted = urlToText(city);
        let streetFormatted = urlToText(street);
        let typeFormatted = urlToText(type);
        let priceFormatted = textToPrice(price);

        var image = cloudinaryPath + house.id + '-photo-1.jpg';
        var {inlineImgClass} = this.props;
        const listingAlt = "House for sale: " + mls + " " + streetFormatted + ", " + cityFormatted + ", IL " + zip;

        return (
            <Card className={styles.row} shadow={0}>
                <div className={styles.colImage}>
                    <div className={styles.imageContainer}>
                        {image && <ImageBackground imgWidth="auto" imgHeight="150" backgroundImage={image}/> }
                        {!image &&
                        <img
                            className={styles.image}
                            src={houseDefault}
                            alt={listingAlt}/>
                        }
                    </div>
                </div>
                <div className={styles.colInfo}>
                    <h4 className={styles.address}>
                        {street && <span> {streetFormatted} </span> }

                        {city && < span > {cityFormatted} </span> }
                        <span> IL, </span>
                        {zip && <span> {zip} </span> }
                    </h4>
                    <h3 className={styles.price}>
                        {price && <span> {priceFormatted} </span> }
                    </h3>
                    <p>
                        {type && <span > {typeFormatted}</span> }
                        {mls && <span> {" | MLS#: " + mls} </span>}
                    </p>
                    <p>
                        {beds && < span > {"Beds: " + beds} </span>}
                        {baths && <span> {" | Baths: " + baths} </span> }
                    </p>
                    <p>
                        {built && < span > {"Year: " + yearFormatted} </span>}
                    </p>
                </div>
            </Card>
        );
    }
}
export default HouseThumbInline;
