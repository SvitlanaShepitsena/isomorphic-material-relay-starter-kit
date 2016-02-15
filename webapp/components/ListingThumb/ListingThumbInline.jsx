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
            <Card className="ListingThumbCard row" shadow={0}>
                <div className="four columns"
                     style={{display:"inline-block",padding:6,backgroundColor:"whitesmoke",textAlign:"center"}}>
                    { this.props.image &&
                    <ImageBackground style={{margin:'0 auto'}}
                                     imgWidth="auto" imgHeight="120"
                                     backgroundImage={this.props.image}/>
                    }

                    {!this.props.image &&
                    <div style={{ maxHeight:120}}>
                        <img
                            className={this.props.listingImageClass}
                            src='http://res.cloudinary.com/svitlana/image/upload/v1453494429/house-picture-icon_og71rx.png'
                            alt="" style={{ margin:"0 auto",display:"block",width:170, height:"auto"}}/>
                    </div>
                    }
                </div>
                <div className="six columns"
                     style={{display:"inline-block"}}>
                    <h4 style={{fontSize:18,fontWeight:500, margin:0, paddingTop:5, lineHeight:"24px"}}
                        className="text-primary">
                        {this.props.street &&
                        <span> {this.props.street + ", "} </span>
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
                    <h3 style={{lineHeight:"28px", fontSize:"20px", margin:0, fontFamily:"Helvetica neue", color:"#393939", fontWeight:"bold"}}>
                        {this.props.price}</h3>
                    <p style={{margin:0}}>
                        {this.props.type &&
                        <span > {this.props.type}</span>
                        }
                        {this.props.mls &&
                        <span>
                            {" | MLS#: " + this.props.mls}
                        </span>}
                    </p>
                    <p style={{margin:0}}>
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
