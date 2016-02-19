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

/*Components*/
import House_List from './../../components/HouseSale/House_List.jsx';
import ImageBackground from '../shared/ImageBackground.js';

export default class ListingThumbLarge extends React.Component {
    static propTypes = {
        city: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    };

    render() {
        var price = this.props.price;
        var type = this.props.type;
        var beds = this.props.beds;
        var baths = this.props.baths;
        var image = this.props.image;
        var street = this.props.street;
        var city = this.props.city;
        var zip = this.props.zip;
        var year = this.props.year;
        var imgClassName = this.props.imgClassName;
        return (
            <Card className="ListingThumbLarge" shadow={0}>
                <CardHeader
                    title={"Price: " + price}
                    subtitle={"Property Type: " + type}
                />
                <CardMedia
                    overlay={<CardTitle style={{padding:"0 0 5px 16px"}}  subtitle={"Beds:" + beds +  "Baths: " + baths } />}
                >
                    <div>
                        {image &&
                        <ImageBackground style={{margin:'0 auto'}}
                                         imgWidth="auto" imgHeight="180"
                                         backgroundImage={image}/>
                        }

                        {!image &&
                        <img
                            className={imgClassName ? imgClassName: "ListingThumbLarge__image"}
                            src='http://res.cloudinary.com/svitlana/image/upload/v1453494429/house-picture-icon_og71rx.png'
                            alt=""/>
                        }
                    </div>
                </CardMedia>
                <CardTitle
                    title={
                   <h4 className="ListingThumbLarge__address">
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
