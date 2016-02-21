import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';
import textToPrice from '../../../utils/textToPrice.js';

import Card from 'material-ui/lib/card/card';
import PhotoGallery from '../../PhotoGallery/PhotoGallery.js';

class HouseInfo extends React.Component {
    static propTypes = {
        house: PropTypes.object.isRequired
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
        var zip = this.props.house.zip.code;
        var year = this.props.house.year;
        var description = this.props.house.description;

        /*Formatter*/
        let cityFormatted = urlToText(city);
        let streetFormatted = urlToText(street);
        let typeFormatted = urlToText(type);
        let priceFormatted = textToPrice(price);

        return (
            <Card className="HouseInfo">
                <div className="row HouseInfo__card-header">
                    <div className="six columns HouseInfo__card-address">
                        <h1>
                            {street && <span>{streetFormatted}</span> }
                            <br/>
                            {city && <span> {cityFormatted + ", "} </span> }
                            {zip && <span> {zip + ", "} </span> }
                        </h1>

                        {type && <p> {typeFormatted} </p> }
                    </div>
                    <div className="six columns HouseInfo__card-price">
                        {price && <h4> {priceFormatted} </h4> }
                        {mls && <p> {"MLS#: " + mls} </p> }
                        {year && <p> {"Year: " + year} </p> }
                    </div>
                </div>

                {image && <PhotoGallery image={image}/> }
                <hr/>

                {description && <article><p> {description} </p></article> }

                <hr/>
                <article >
                    <h4>Key Facts:</h4>
                    <div className="row">
                        <div className="six columns HouseInfo__key-facts">
                            {type && <p> {"Type: " + typeFormatted} </p> }

                            {/*                                {exteriorDetails && exteriorDetails['Lot Size'] &&
                             <p> {"Lot Size: " + exteriorDetails['Lot Size']} </p>
                             }*/}
                            {price && <p> Price: ${priceFormatted} </p> }

                            {year && <p> Year Built: {year} </p> }
                        </div>
                        <div className="six columns">

                            {beds && <p> {"Beds: " + beds} </p> }
                            {baths && <p> {"Baths: " + baths} </p> }
                            {/*                                {exteriorDetails && exteriorDetails['Parking'] &&
                             <p> {"Parking: " + exteriorDetails['Parking']} </p>
                             }*/}
                        </div>

                    </div>
                </article>

            </Card>
        );
    }
}
export default HouseInfo;
