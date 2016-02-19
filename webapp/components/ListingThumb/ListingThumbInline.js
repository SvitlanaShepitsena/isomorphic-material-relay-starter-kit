import React, {PropTypes} from 'react';
import Relay from 'react-relay';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';

import ImageBackground from '../Common/ImageBackground.js';

export default class ListingThumbLarge extends React.Component {
    static propTypes = {
        house: PropTypes.object.isRequired,
        imgClassName: PropTypes.string
    };

    render() {
        var price = this.props.house.price;
        var type = this.props.house.type.type;
        var beds = this.props.house.beds;
        var baths = this.props.house.baths;
        var mls = this.props.house.mls;
        var image = this.props.house.image;
        var street = this.props.house.street;
        var city = this.props.house.city.name;
        var zip = this.props.house.zip.code;
        var inlineImgClass = this.props.inlineImgClass;
        return (
            <Card className="ListingThumbInline row" shadow={0}>
                <div className="four columns ListingThumbInline__image-container ">
                    { image &&
                    <ImageBackground style={{margin:'0 auto'}}
                                     imgWidth="auto" imgHeight="120"
                                     backgroundImage={image}/>
                    }

                    {!image &&
                    <img
                        className={inlineImgClass ? inlineImgClass: "ListingThumbInline__image"}
                        src='http://res.cloudinary.com/svitlana/image/upload/v1453494429/house-picture-icon_og71rx.png'
                        alt=""/>
                    }
                </div>
                <div className="six columns">
                    <h4 className="text-primary ListingThumbInline__address">
                        {street &&
                        <span> {street} </span>
                        }
                        <br/>
                        {city &&
                        < span > {city } </span>
                        }
                        <span> IL, </span>
                        {zip &&
                        <span> {zip} </span>
                        }
                    </h4>
                    <h3 className="ListingThumbInline__price">
                        {price}</h3>
                    <p>
                        {type &&
                        <span > {type}</span>
                        }
                        {mls &&
                        <span>
                            {" | MLS#: " + mls}
                        </span>}
                    </p>
                    <p>
                        {beds &&
                        < span >
                        {"Beds: " + beds}
                            </span>}
                        {baths &&
                        <span>
                            {" | Baths: " + baths}
                        </span>
                        }
                    </p>
                </div>
            </Card>
        );
    }
}
