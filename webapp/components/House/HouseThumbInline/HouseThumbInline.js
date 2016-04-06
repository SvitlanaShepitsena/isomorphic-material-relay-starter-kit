import React, {PropTypes} from 'react';
import axios from 'axios';
import urlToText from '../../../utils/urlToText.js';
import textToPrice from '../../../utils/textToPrice.js';
import getYear from '../../../utils/getYear';
import settings from '../../../settings/settings.js';

/*=materialUi*/
import Card from 'material-ui/lib/card/card';
import ImageBackground from '../../Common/ImageBackground/ImageBackground.js';

/*=styles*/
import styles from './HouseThumbInline.less';

class HouseThumbInline extends React.Component {
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
        var {baths, beds, built, city, mls, price, street, type, zip} = house;
        /*Formatter*/
        let cityFormatted = urlToText(city);
        let priceFormatted = textToPrice(price);
        let streetFormatted = urlToText(street);
        let typeFormatted = urlToText(type);
        let yearFormatted = getYear(built);
<<<<<<< HEAD
        
=======

>>>>>>> work-local
        /*Composed String*/
        const bathsText = ` | Baths: ${baths}`;
        const bedsText = `Beds: ${beds}`;
        const mlsText = ` | MLS#: ${mls}`;
        const yearText = `Year: ${yearFormatted}`;
        const noYear = yearFormatted == 0;
        return (
            <div className={styles.colInfo}>
                <h4 className={styles.address}>
                    {street && <span> {streetFormatted} </span> }
                        <span className={styles.address2}>
                        {city && < span > {cityFormatted} </span> }
                            <span> IL, </span>
                            {zip && <span> {zip} </span> }
                        </span>
                </h4>
                <h3 className={styles.price}>
                    {price && <span> {priceFormatted} </span> }
                </h3>
                <p >
                    {type && <span className={styles.type}> {typeFormatted}</span> }
                    {mls && <span className={styles.mls}> {mlsText} </span>}
                </p>
                <p>
                    {beds && < span > {bedsText} </span>}
                    {baths && <span> {bathsText} </span> }
                </p>
                <p>
                    {!noYear && < span className={styles.year}> {yearText} </span>}
                    {noYear && < span className={styles.year}> Year: n/a </span>}
                </p>
            </div>
        );
    };

    render() {
        return (
            <Card className={styles.row} shadow={0}>
                {this.showImg()}
                {this.showInfo()}
            </Card>
        );
    }
}
export default HouseThumbInline;
