import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';
import textToPrice from '../../../utils/textToPrice.js';
import getYear from '../../../utils/getYear';

import Card from 'material-ui/lib/card/card';
import PhotoGallery from '../../PhotoGallery/PhotoGallery.js';
import styles from './HouseInfo.less';

class HouseInfo extends React.Component {
    static propTypes = {
        house: PropTypes.object.isRequired
    };

    render() {
        let {house} = this.props;
        let {baths, beds, mls, price, street, built, description, image} = house;
        let city = house.city.name;
        let zip = house.zip.code;
        let type = house.type.type;

        /*Formatter*/
        let yearFormatted = getYear(built);
        let cityFormatted = urlToText(city);
        let streetFormatted = urlToText(street);
        let typeFormatted = urlToText(type);
        let priceFormatted = textToPrice(price);

        return (
            <Card className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.col2}>
                        <div className={styles.headLeft}>
                            <h1 className={styles.address}>
                                {street && <span>{streetFormatted}</span> }
                                <br/>
                                {city && <span> {cityFormatted + ", IL"} </span> }
                                {zip && <span> {zip} </span> }
                            </h1>

                            {type && <p className={styles.type}> {typeFormatted} </p> }
                        </div>
                    </div>
                    <div className={styles.col2}>
                        <div className={styles.headRight}>
                            {price && <h4 className={styles.price}> {priceFormatted} </h4> }
                            {mls && <p className={styles.mls}> {"MLS#: " + mls} </p> }
                            {built && <p className={styles.year}> {"Year: " + yearFormatted} </p> }
                        </div>
                    </div>
                </div>
                <PhotoGallery image={image} houseId={house.id}/>
                {description &&
                <article className={styles.row}>
                    <div className={styles.col1}>
                        <h4 className={styles.sectionHeader}>Description:</h4>
                        <p className={styles.description}> {description} </p>
                    </div>
                </article> }
                <article className={styles.row}>
                    <div className={styles.col1}>
                        <h4 className={styles.sectionHeader}>Key Facts:</h4>
                        <div className={styles.row}>
                            <div className={styles.col2}>
                                <div className={styles.keyFacts}>
                                    {type && <p> {"Type: " + typeFormatted} </p> }

                                    {/*                                {exteriorDetails && exteriorDetails['Lot Size'] &&
                                     <p> {"Lot Size: " + exteriorDetails['Lot Size']} </p>
                                     }*/}
                                    {price && <p> Price: {priceFormatted} </p> }

                                    {built && <p> Year Built: {yearFormatted} </p> }
                                </div>
                            </div>
                            <div >
                                {beds && <p> {"Beds: " + beds} </p> }
                                {baths && <p> {"Baths: " + baths} </p> }
                                {/*                                {exteriorDetails && exteriorDetails['Parking'] &&
                                 <p> {"Parking: " + exteriorDetails['Parking']} </p>
                                 }*/}
                            </div>
                        </div>
                    </div>
                </article>
            </Card>
        )
    }
}
export default HouseInfo;
