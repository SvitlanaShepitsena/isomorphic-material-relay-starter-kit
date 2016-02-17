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
            <Card className="ListingThumbLarge" shadow={0}>
                <CardHeader
                    title={"Price: " + this.props.price}
                    subtitle={"Property Type: " + this.props.type}
                />
                <CardMedia
                    overlay={<CardTitle style={{padding:"0 0 5px 16px"}}  subtitle={"Beds:" + this.props.beds +  "Baths: " + this.props.baths } />}
                >
                    <div>
                        {this.props.image &&
                        <ImageBackground style={{margin:'0 auto'}}
                                         imgWidth="auto" imgHeight="180"
                                         backgroundImage={this.props.image}/>
                        }

                        {!this.props.image &&
                        <img
                            className={this.props.imgClassName ? this.props.imgClassName: "ListingThumbLarge__image"}
                            src='http://res.cloudinary.com/svitlana/image/upload/v1453494429/house-picture-icon_og71rx.png'
                            alt=""/>
                        }
                    </div>
                </CardMedia>
                <CardTitle
                    title={
                   <h4 className="ListingThumbLarge__address">
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
