import React, {PropTypes} from 'react';
import _ from 'lodash';
import urlToText from '../../../utils/urlToText.js';
import textToPrice from '../../../utils/textToPrice.js';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

/*Components*/
import ImageBackground from '../../Common/ImageBackground/ImageBackground.js';
import styles from './HouseThumbLarge.less';

class HouseThumbLarge extends React.Component {
    static propTypes = {
        house: PropTypes.object.isRequired,
        imgClassName: PropTypes.string
    };

    render() {

        var baths = this.props.house.baths;
        var beds = this.props.house.beds;
        var city = this.props.house.city.name;

        var image = 'http://res.cloudinary.com/remax1stclass/image/upload/v1456344191/' + this.props.house.id + '-photo-1.jpg';

        var mls = this.props.house.mls;
        var price = this.props.house.price;
        var street = this.props.house.street;
        var type = this.props.house.type.type;
        var year = new Date(this.props.house.built).getFullYear().toString();
        var zip = this.props.house.zip.code;
        /*Formatter*/
        let cityFormatted = urlToText(city);
        let streetFormatted = urlToText(street);
        let typeFormatted = urlToText(type);
        let priceFormatted = textToPrice(price);

        var imgClassName = this.props.imgClassName;

        return (
            <Card className={styles.container} shadow={0}>
                <CardHeader title={priceFormatted}
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
                            className={imgClassName ? imgClassName: styles.image}
                            src='http://res.cloudinary.com/svitlana/image/upload/v1453494429/house-picture-icon_og71rx.png'
                            alt=""/>
                        }
                    </div>
                </CardMedia>
                <CardTitle
                    title={
                   <h4 className={styles.address}>
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
export default HouseThumbLarge;
