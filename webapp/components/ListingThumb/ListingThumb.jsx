import React from 'react';
import Relay from 'react-relay';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import House_List from './../../components/HouseSale/House_List.jsx';

export default class ListingThumb extends React.Component {

    render() {
        return (
            <Card className="ListingThumbCard" shadow={0}>
                <div style={{margin:0,padding:'16px 0px'}}>
                    <div style={{display:'inline-block',margin:'0px 8px'}}>
                        <div
                            style={{width: 220,height:'auto',minHeight:150,  background:  `url(http://img4.homefinder.com/i/a78f3810-cab5-11e5-93e1-2c768a520588/w1280-h-q) center / cover`} }></div>
                        {/*                        <img
                         className={this.props.listingImageClass}
                         src='http://res.cloudinary.com/svitlana/image/upload/v1453494429/house-picture-icon_og71rx.png'
                         alt="" style={{height:'auto'}}/>*/}
                    </div>
                    <div style={{display:'inline-block',verticalAlign:'top',margin:'0px 8px'}}>
                        <h4 className="ListingThumbCard__address">
                            Street, City, State, Zip
                        </h4>

                        <p className="ListingThumbCard__price">
                            Price:
                        </p>
                        <p>
                            Property Type:
                        </p>
                        <p>
                            <span>Beds: </span>
                            <span>Baths: </span>
                        </p>
                        <p>
                            <span>Year:</span>
                        </p>
                    </div>
                </div>
            </Card>
        );
    }
}
