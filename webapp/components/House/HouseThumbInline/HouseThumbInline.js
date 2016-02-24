import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';
import textToPrice from '../../../utils/textToPrice.js';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import ImageBackground from '../../Common/ImageBackground.js';

class HouseThumbInline extends React.Component {
    static propTypes = {
        house: PropTypes.object.isRequired,
        imgClassName: PropTypes.string
    };

    render() {
        var baths = this.props.house.baths;
        var beds = this.props.house.beds;
        var city = this.props.house.city.name;
        var image = 'http://res.cloudinary.com/remax1stclass/image/upload/v1456344191/'+this.props.house.id+'-photo-1.jpg';
        console.log(image);
        var mls = this.props.house.mls;
        var price = this.props.house.price;
        var street = this.props.house.street;
        var type = this.props.house.type.type;
        var zip = this.props.house.zip.code;

        var inlineImgClass = this.props.inlineImgClass;

        /*Formatter*/
        let cityFormatted = urlToText(city);
        let streetFormatted = urlToText(street);
        let typeFormatted = urlToText(type);
        let priceFormatted = textToPrice(price);

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
                        <span> {streetFormatted} </span>
                        }
                        <br/>
                        {city &&
                        < span > {cityFormatted} </span>
                        }
                        <span> IL, </span>
                        {zip &&
                        <span> {zip} </span>
                        }
                    </h4>
                    <h3 className="ListingThumbInline__price">
                        {price &&
                        <span> {priceFormatted} </span>
                        }
                    </h3>
                    <p>
                        {type &&
                        <span > {typeFormatted}</span>
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
export default HouseThumbInline;
