import React, {PropTypes} from 'react';
import axios from 'axios';
import urlToText from '../../../utils/urlToText.js';
import settings from '../../../settings/settings';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
/*=styles*/
import styles from './CityThumbPicture.less';

class CityThumbPicture extends React.Component {
    state = {
        img: ''
    };
    static propTypes = {
        cityName: PropTypes.string.isRequired,
        housesLength: PropTypes.number.isRequired
    };

    componentWillMount() {
        let {cityName} = this.props;
        let {houseDefault, citiesPath} = settings;
        let imgUrl = `${citiesPath}${cityName}4.jpg `;
        this.cityFormatted = urlToText(cityName);
        this.alt = `${this.cityFormatted}, IL homes for sale`;

        axios.get(imgUrl).then(response=> {
            if (response.status < 400) {
                this.setState({img: imgUrl})
            }
        }).catch(()=> {
            this.setState({img: houseDefault});
        })

    }

    cityBackground() {
        let {img} = this.state;
        return (
            <CardMedia overlay={<CardTitle className={styles.cityName}  subtitle={<h2>{this.cityFormatted}</h2>} />}>
                <img style={{minWidth:"300px",minHeight:"200px"}} alt={this.alt} src={img}/>
            </CardMedia>
        );
    }

    cityInfo() {
        let {housesLength} = this.props;
        const listingsNum = `Listings for sale: ${housesLength}`;
        return (
            <CardTitle className={styles.cityInfo}
                       subtitle={ <h3> {listingsNum} </h3> }
            />
        );
    };

    render() {
        return (
            <div>
                <Card className={styles.container} shadow={0}>
                    {this.cityBackground()}
                    {this.cityInfo()}
                </Card >
            </div>

        );
    }
}
export default CityThumbPicture;
