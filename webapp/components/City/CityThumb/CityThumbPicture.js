import React from 'react';

import urlToText from '../../../utils/urlToText.js';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

export default class CityThumbPicture extends React.Component {

    render() {
        const city = this.props.cityName;
        const housesLength = this.props.housesLength;
        
        /*Formatter*/
        let cityFormatted = urlToText(city);

        return (
            <Card className="CityThumbPicture" shadow={0}>
                <CardMedia
                    overlay={<CardTitle className="CityThumbPicture__city-name"  subtitle={cityFormatted} />}>
                    <img src="http://www.datarecovery.net/i/Places/skokie-il-hard-drive-data-recovery.jpg"/>
                </CardMedia>
                <CardTitle className="CityThumbPicture__card-title"
                           subtitle={ <span>
                            Listings for sale:
                           {housesLength && <span className="text-primary"> {housesLength} </span> } </span> }
                />
                {/*                <CardText className="CityThumbPicture__card-text ">
                 Median price: {this.props.medianPrice && <span> { +this.props.medianPrice} </span> }
                 </CardText>*/}
            </Card >

        );
    }
}
