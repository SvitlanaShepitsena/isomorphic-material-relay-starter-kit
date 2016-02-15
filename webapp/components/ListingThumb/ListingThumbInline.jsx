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

import ImageBackground from '../shared/ImageBackground.js';

export default class ListingThumbLarge extends React.Component {

    render() {
        return (
            <Card className="ListingThumbInline row" shadow={0}>
                <div className="four columns ListingThumbInline__image-container ">
                    { this.props.image &&
                    <ImageBackground style={{margin:'0 auto'}}
                                     imgWidth="auto" imgHeight="120"
                                     backgroundImage={this.props.image}/>
                    }

                    {!this.props.image &&
                    <img
                        className={this.props.listingImageClass}
                        src='http://res.cloudinary.com/svitlana/image/upload/v1453494429/house-picture-icon_og71rx.png'
                        alt="" style={{ margin:"0 auto",display:"block",width:170, height:"auto"}}/>
                    }
                </div>
                <div className="six columns">
                    <h4 className="text-primary ListingThumbInline__address">
                        {this.props.street &&
                        <span> {this.props.street} </span>
                        }
                        <br/>
                        {this.props.city &&
                        < span > {this.props.city } </span>
                        }
                        <span> IL, </span>
                        {this.props.zip &&
                        <span> {this.props.zip} </span>
                        }
                    </h4>
                    <h3 className="ListingThumbInline__price">
                        {this.props.price}</h3>
                    <p>
                        {this.props.type &&
                        <span > {this.props.type}</span>
                        }
                        {this.props.mls &&
                        <span>
                            {" | MLS#: " + this.props.mls}
                        </span>}
                    </p>
                    <p>
                        {this.props.beds &&
                        < span >
                        {"Beds: " + this.props.beds}
                            </span>}
                        {this.props.baths &&
                        <span>
                            {" | Baths: " + this.props.baths}
                        </span>
                        }
                    </p>
                </div>
            </Card>
        );
    }
}
