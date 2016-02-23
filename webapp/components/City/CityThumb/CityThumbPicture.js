import React from 'react';
import urlToText from '../../../utils/urlToText.js';
import style from './CityThumbPicture.css';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

class CityThumbPicture extends React.Component {

    render() {
        const city = this.props.cityName;
        const housesLength = this.props.housesLength;

        /*Formatter*/
        let cityFormatted = urlToText(city);

        return (
            <Card className={style.main} shadow={0}>
                <CardMedia
                    overlay={<CardTitle className={style.cityName}  subtitle={cityFormatted} />}>
                    <img src="http://www.datarecovery.net/i/Places/skokie-il-hard-drive-data-recovery.jpg"/>
                </CardMedia>
                <CardTitle className={style.cardTitle}
                           subtitle={ <span>
                            Listings for sale:
                           {housesLength && <span className="text-primary"> {housesLength} </span> } </span> }
                />
                {/*                <CardText className="s.CityThumbPicture__card-text ">
                 Median price: {this.props.medianPrice && <span> { +this.props.medianPrice} </span> }
                 </CardText>*/}
            </Card >

        );
    }
}
export default CityThumbPicture;
