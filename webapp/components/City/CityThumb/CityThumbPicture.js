import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
/*=styles*/
import styles from './CityThumbPicture.less';

class CityThumbPicture extends React.Component {
    static propTypes = {
        cityName: PropTypes.string,
        housesLength: PropTypes.number
    };

    render() {
        const cityName = this.props.cityName;
        const housesLength = this.props.housesLength;

        /*Formatter*/
        let cityFormatted = urlToText(cityName);

        return (
            <Card className={styles.container} shadow={0}>
                <CardMedia
                    overlay={<CardTitle className={styles.cityName}  subtitle={cityFormatted} />}>
                    <img src="http://localhost:8080/public/img/skokie.jpg"/>
                </CardMedia>
                <CardTitle className={styles.cardTitle}
                           subtitle={ <span>
                            Listings for sale:
                           {housesLength && <span className={styles.number}> {housesLength} </span> } </span> }
                />
                {/*                <CardText className="CityThumbPicture__card-text ">
                 Median price: {this.props.medianPrice && <span> { +this.props.medianPrice} </span> }
                 </CardText>*/}
            </Card >

        );
    }
}
export default CityThumbPicture;
