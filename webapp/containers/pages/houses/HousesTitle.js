import React, {PropTypes} from 'react';

/*Components*/
import HouseInfo from '../../../components/House/HouseInfo/HouseInfo.js';
import PhotoGallery from '../../../components/PhotoGallery/PhotoGallery.js';

class HousesTitle extends React.Component {
    static propTypes = {
        zipType: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cityFormatted: PropTypes.string.isRequired
    };

    render() {
        const {zipType, cityFormatted,count}=this.props;
        return (
            <div>
                {zipType.match(/^\d+$/g) && <h1>{`Houses for Sale in ${cityFormatted}, at ${zipType} (${count})`}</h1>}
                {zipType.match(/all/) && <h1>{`All Houses for Sale in ${cityFormatted} (${count})`}</h1>}
                {zipType.match(/^[^\d+]+$/g) && zipType.length > 3 &&
                <h1>{`${zipType} for sale in ${cityFormatted} (${count})`}</h1>}
            </div>
        );
    }
}
;

export default HousesTitle;
