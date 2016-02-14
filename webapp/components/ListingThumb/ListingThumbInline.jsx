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

export default class ListingThumbLarge extends React.Component {

    render() {
        return (
            <Card className="ListingThumbCard row" shadow={0}>
                <div className="four columns"
                     style={{display:"inline-block",padding:6,backgroundColor:"whitesmoke",textAlign:"center"}}>
                    <ImageBackground style={{margin:'0 auto'}}
                                     imgWidth="auto" imgHeight="120"
                                     backgroundImage="http://img4.homefinder.com/i/1751e1b8-c695-11e5-9132-2c768a520588/w592-h-q"/>

                    {/*
                     <div style={{ maxHeight:120}}>
                     <img
                     className={this.props.listingImageClass}
                     src='http://res.cloudinary.com/svitlana/image/upload/v1453494429/house-picture-icon_og71rx.png'
                     alt="" style={{ margin:"0 auto",display:"block",width:170, height:"auto"}}/>
                     </div>
                     */}
                </div>
                <div className="six columns"
                     style={{display:"inline-block"}}>
                    <h4 style={{fontWeight:500, margin:0}} className="text-primary">
                        Street, City, State, Zip
                    </h4>
                    <h3 style={{fontSize:"20px", margin:0, fontFamily:"Helvetica neue", color:"#393939", fontWeight:"bold"}}>$987,654</h3>
                    <p style={{margin:0}}> Property Type:  Year: </p>
                    <p style={{margin:0}}> Beds: Baths: </p>
                </div>
            </Card >
        );
    }
}
