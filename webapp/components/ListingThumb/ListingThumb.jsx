import React from 'react';
import Relay from 'react-relay';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';

/*Components*/
import House_List from './../../components/HouseSale/House_List.jsx';

import ImageBackground from '../shared/ImageBackground.js';

export default class ListingThumb extends React.Component {

    render() {
        return (
            <Card className="ListingThumbCard" shadow={0}>
                <CardHeader
                    title="Price: "
                    subtitle="Property Type: "
                />
                <CardMedia
                    overlay={<CardTitle style={{padding:"0 0 5px 16px"}}  subtitle="Beds:  Baths" />}
                >
                    <ImageBackground style={{margin:'0 auto'}}
                                     imgWidth="auto" imgHeight="180"
                                     backgroundImage="http://img4.homefinder.com/i/1751e1b8-c695-11e5-9132-2c768a520588/w592-h-q"/>

                    {/*                    <div style={{display:"block", width:"220px", margin:"0 auto"}}>
                     <img
                     className={this.props.listingImageClass}
                     src='http://res.cloudinary.com/svitlana/image/upload/v1453494429/house-picture-icon_og71rx.png'
                     alt="" style={{display:"block", width:"220px", margin:"0 autd"}}/>
                     </div>*/}
                </CardMedia>
                <CardTitle
                    title={
                   <h4 style={{fontWeight:500, margin:0}} >
                    Street, City, State, Zip
                     </h4>
                   }
                    subtitle={
                   <span> Year: </span>
                   }
                >
                </CardTitle>
            </Card >
        );
    }
}
