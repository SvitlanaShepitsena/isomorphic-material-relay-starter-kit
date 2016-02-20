import React, {PropTypes} from 'react';
import _ from 'lodash';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

/*Components*/
import ImageBackground from '../../Common/ImageBackground.js';

export default class HouseThumbLarge extends React.Component {
    static propTypes = {
        house: PropTypes.object.isRequired,
        imgClassName: PropTypes.string
    };

    render() {

        var baths = this.props.house.baths;
        var beds = this.props.house.beds;
        var city = this.props.house.city.name;
        var image = this.props.house.image;
        var mls = this.props.house.mls;
        var price = this.props.house.price;
        var street = this.props.house.street;
        var type = this.props.house.type.type;
        var year = this.props.house.year;
        var zip = this.props.house.zip.code;
        /*Formatter*/
        let cityFormatted = _.startCase(city.replace(/-+/g, ' '));
        let streetFormatted = _.startCase(street.replace(/-+/g, ' '));
        let priceFormatted = price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        let typeFormatted = _.startCase(type.replace(/-+/g, ' '));

        var imgClassName = this.props.imgClassName;

        return (
            <Card className="ListingThumbLarge" shadow={0}>
                <CardHeader title={"$" + priceFormatted}
                            subtitle={typeFormatted}
                />
                <CardMedia
                    overlay={<CardTitle
                    style={{padding:"0 0 5px 16px"}}
                    subtitle={
                     <span>
                     { beds && <span> {"Beds: " + beds} </span> }
                     { baths && <span> {"Beds: " + baths} </span> }
                    </span> }
                    />
                    }>
                    <div>
                        {image &&
                        <ImageBackground style={{margin:'0 auto'}}
                                         imgWidth="auto" imgHeight="220"
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
                        <span style={{display:"block",paddingBottom:8}} > {streetFormatted} </span>
                        }
                        {city &&
                        < span > {cityFormatted } </span>
                        }
                        <span> IL, </span>
                        {zip &&
                        <span> {zip} </span>
                        }
                     </h4>
                   }
                    subtitle={ <span> Year: {!year && <span> n/a</span> }  { year && <span> {year}</span> } </span> }
                >
                </CardTitle>
            </Card >
        );
    }
}
