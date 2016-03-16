import React, {PropTypes} from 'react';

/*=materialUi*/
import CityThumbPicture from '../CityThumb/CityThumbPicture.js';

/*=components*/
import SvLink from '../../Common/SvLink/SvLink.js';
/*=styles*/
import styles from './CitiesList.less';

class CitiesList extends React.Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
        itemId: PropTypes.string.isRequired,
        fullUrl: PropTypes.string,
        children: PropTypes.string
    };
    oneCity = (edge) => {
        let item = edge.node;
        let {itemId, fullUrl} = this.props;
        let itemValue = item[itemId];
        let url = (fullUrl || '') + itemValue;
        let housesLength = Number(item.count);
        return (
            <div className={styles.item} key={itemValue}>
                <SvLink url={url}>
                    <CityThumbPicture
                        housesLength={housesLength}
                        cityName={itemValue}/>
                </SvLink>
            </div>
        )
    };

    render() {
        let {list} = this.props;
        return (
            <div className={styles.container}>
                {list.map(this.oneCity)}
            </div>
        );
    }
}

export default  CitiesList;
