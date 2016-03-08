import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';
import settings from '../../../settings/settings';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
/*=styles*/
import styles from './CityThumbPicture.less';

class CityThumbPicture extends React.Component {
    static propTypes = {
        cityName: PropTypes.string.isRequired,
        housesLength: PropTypes.number.isRequired
    };

    cityBackground() {
        let {cityName} = this.props;
        var citiesPath = settings.citiesPath;
        var {houseDefault} = settings;
        const imgPath = `${citiesPath}${cityName}2.jpg `;
        const cityImage = cityName ? imgPath : houseDefault;
        let cityFormatted = urlToText(cityName);
        const alt = `${cityFormatted}, IL homes for sale`;
        return (
            <CardMedia overlay={<CardTitle className={styles.cityName}  subtitle={cityFormatted} />}>
                <img alt={alt} src={cityImage}/>
            </CardMedia>
        );
    }

    cityInfo() {
        let {housesLength} = this.props;
        const listingsNum = `Listings for sale: ${housesLength}`;
        return (
            <CardTitle className={styles.cardTitle}
                       subtitle={listingsNum}
            />
        );
    };

    render() {
        return (
            <Card className={styles.container} shadow={0}>
                {this.cityBackground()}
                {this.cityInfo()}
            </Card >

        );
    }
}
export default CityThumbPicture;
