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
            <Card className="ListingThumbCard" shadow={0}>
                <CardMedia
                    overlay={<CardTitle style={{padding:"0 0 5px 16px"}}  subtitle="City Name" />}
                >
                    <img src="http://www.datarecovery.net/i/Places/skokie-il-hard-drive-data-recovery.jpg"/>
                </CardMedia>
                <CardTitle style={{padding:"5px 12px 0px", margin:0, fontSize:13}}
                           subtitle="# homes for sale"/>
                <CardText style={{padding:"5px 12px 12px",fontSize:13}}>
                    Median price:
                </CardText>
            </Card >

        );
    }
}
