import React from 'react';
import Relay from 'react-relay';

/*=MaterialUi*/
import Card from '../../../node_modules/material-ui/lib/card/card';
import CardHeader from '../../../node_modules/material-ui/lib/card/card-header';
import CardMedia from '../../../node_modules/material-ui/lib/card/card-media';
import CardTitle from '../../../node_modules/material-ui/lib/card/card-title';
import CardText from '../../../node_modules/material-ui/lib/card/card-text';
import CardActions from '../../../node_modules/material-ui/lib/card/card-actions';
import FlatButton from '../../../node_modules/material-ui/lib/flat-button';

/*Components*/
import House_List from './../HouseSale/House_List.jsx';

import ImageBackground from '../shared/ImageBackground.js';

export default class CityThumbPicture extends React.Component {

    render() {
        return (
            <Card className="CityThumbPicture" shadow={0}>
                <CardMedia
                    overlay={<CardTitle className="CityThumbPicture__city-name"  subtitle={this.props.cityName} />}>
                    <img src="http://www.datarecovery.net/i/Places/skokie-il-hard-drive-data-recovery.jpg"/>
                </CardMedia>
                <CardTitle className="CityThumbPicture__card-title"
                           subtitle={
                           <span> {this.props.housesLength && <span> { + this.props.housesLength} </span> } </span>
                           }
                />
                <CardText className="CityThumbPicture__card-text ">
                    Median price: {this.props.medianPrice && <span> { +this.props.medianPrice} </span> }
                </CardText>
            </Card >

        );
    }
}
