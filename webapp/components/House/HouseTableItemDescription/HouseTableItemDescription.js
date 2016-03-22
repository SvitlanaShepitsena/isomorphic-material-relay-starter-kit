import React, {PropTypes} from 'react';
import axios from 'axios';
import urlToText from '../../../utils/urlToText.js';
import textToPrice from '../../../utils/textToPrice.js';
import getYear from '../../../utils/getYear';
import settings from '../../../settings/settings.js';

/*=materialUi*/
import ImageBackground from '../../Common/ImageBackground/ImageBackground.js';
import Card from 'material-ui/lib/card/card';
/*=styles*/
import styles from './HouseTableItemDescription.less';

class HouseTableItemDescription extends React.Component {
    state = {
        img: ''
    };
    static propTypes = {
        house: PropTypes.object.isRequired
    };

    componentWillMount() {
        let {house} = this.props;
        let {houseDefault, cloudinaryPath} = settings;
        var imgUrl = `${cloudinaryPath}${house.id}-photo-1.jpg`;

        axios.get(imgUrl).then(response=> {
            if (response.status < 400) {
                this.setState({img: imgUrl})
            }
        }).catch(()=> {
            this.setState({img: houseDefault});
        })
    }

    showImg() {
        let {img} = this.state;
        return (
            <div className={styles.colImage}>
                <div className={styles.imageContainer}>
                    <ImageBackground imgWidth="auto" imgHeight="150" backgroundImage={img}/>
                </div>
            </div>
        );
    };

    showInfo() {
        let {house} = this.props;
        var {baths, beds, built, city, description, mls, image, price, street, type, zip} = house;
        /*Formatter*/
        let cityFormatted = urlToText(city);
        let priceFormatted = textToPrice(price);
        let streetFormatted = urlToText(street);
        let typeFormatted = urlToText(type);
        let yearFormatted = getYear(built);

        /*Composed String*/
        const bathsText = `${baths} ba`;
        const bedsText = `${beds} bd`;
        const typeText = `Type: ${typeFormatted}`;
        const mlsText = `MLS#: ${mls}`;
        const yearText = `Year: ${yearFormatted}`;
        const imagesText = `(${image} pictures)`;
        const priceText = `Price: ${priceFormatted}`;
        return (
            <Card className={styles.container}>
                <h3 className={styles.address}>
                    {street && <span> {streetFormatted} </span> }
                    {city && < span > {cityFormatted} </span> }
                    <span> IL, </span>
                    {zip && <span> {zip} </span> }
                    <span className={styles.picsNumber}> {imagesText}</span>
                </h3>
                <div className={styles.keyFacts}>
                    <h4>
                        Key facts:
                    </h4>
                    <div className={styles.row}>
                        <div className={styles.cellKeyFacts}>
                            {price && <span> {priceText} </span> }
                            {type && <span>{typeText}</span>}
                        </div>
                        <div className={styles.cellKeyFacts}>
                            {built && <span> {yearText} </span>}
                            {mls && <span className={styles.keyFact}> {mlsText} </span>}
                        </div>
                        <div className={styles.cellKeyFacts}>
                            {beds && < span > {bedsText} </span>}
                            {baths && <span> {bathsText} </span> }
                        </div>
                    </div>
                    <div>
                        <h4>Description: </h4>
                        {description && <p>{description}</p>}
                    </div>
                </div>
            </Card>
        );
    };

    render() {
        return (
            <div className={styles.row} shadow={0}>
                {this.showInfo()}
            </div>
        );
    }
}
export default HouseTableItemDescription;
