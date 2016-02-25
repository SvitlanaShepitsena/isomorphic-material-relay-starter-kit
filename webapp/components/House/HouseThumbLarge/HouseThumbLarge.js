import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';
import textToPrice from '../../../utils/textToPrice.js';
import getYear from '../../../utils/getYear';

/*=materialUi*/
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

/*=components*/
import ImageBackground from '../../Common/ImageBackground/ImageBackground.js';
import styles from './HouseThumbLarge.less';
import settings from '../../../settings/settings.js';

class HouseThumbLarge extends React.Component {
    static propTypes = {
        house: PropTypes.object.isRequired,
        imgClassName: PropTypes.string
    };

    render() {
        let {house} = this.props;
        var {baths, beds, mls, price, street} = house;
        var city = house.city.name;
        var zip = house.zip.code;
        var type = house.type.type;

        var image = settings.cloudinaryPath + house.id + '-photo-1.jpg';
        var {imgClassName} = this.props;

        /*Formatter*/
        var year = getYear(house.built);
        let cityFormatted = urlToText(city);
        let streetFormatted = urlToText(street);
        let typeFormatted = urlToText(type);
        let priceFormatted = textToPrice(price);

        const listingAlt = "House for sale: " + mls + " " + streetFormatted + ", " + cityFormatted + ", IL " + zip;

        return (
            <Card className={styles.container} shadow={0}>
                <CardHeader title={<span className={styles.price}>{priceFormatted}</span>} subtitle={typeFormatted}/>
                <CardMedia
                    overlay={<CardTitle className={styles.cardTitle}
                    subtitle={
                     <span>
                     { beds && <span> {"Beds: " + beds} </span> }
                     { baths && <span> {"Beds: " + baths} </span> }
                    </span> }
                    />
                    }>
                    <div>
                        {image &&
                        <ImageBackground imgWidth="auto" imgHeight="220" backgroundImage={image}/>
                        }
                        {!image &&
                        <img className={imgClassName ? imgClassName: styles.image} src={settings.houseDefault}
                             alt={listingAlt}/>
                        }
                    </div>
                </CardMedia>
                <CardTitle
                    title={
                   <h4 className={styles.address}>
                        {street && <span className={styles.street}> {streetFormatted} </span> }
                        {city && < span > {cityFormatted } </span> }
                        <span> IL, </span>
                        {zip && <span> {zip} </span> }
                     </h4>
                   }
                    subtitle={ <span> Year: {!year && <span> n/a</span> }  { year && <span> {year}</span> } </span> }
                >
                </CardTitle>
            </Card >
        );
    }
}
export default HouseThumbLarge;
