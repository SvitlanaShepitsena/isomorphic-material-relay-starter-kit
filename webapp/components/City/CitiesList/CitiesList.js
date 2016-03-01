import React, {PropTypes} from 'react';

/*=materialUi*/
import CityThumbPicture from '../CityThumb/CityThumbPicture.js';

/*=components*/
import SvLink from '../../Common/SvLink.js';
/*=styles*/
import styles from './CitiesList.less';

class CitiesList extends React.Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
        itemId: PropTypes.string.isRequired,
        fullUrl: PropTypes.string,
        children: PropTypes.string
    };

    render() {
        return (
            <div className={styles.container}>
                {this.props.list.map(edge => {
                        let item = edge.node;
                        let {itemId, fullUrl, children} = this.props;
                        let itemValue = item[itemId];
                        let url = (fullUrl || '') + itemValue;
                        let housesLength = item[`${children}_Count`];
                        return (
                            <div className={styles.item} key={itemValue}>
                                <SvLink url={url}>
                                    <CityThumbPicture
                                        housesLength={housesLength}
                                        cityName={itemValue}/>
                                </SvLink>
                            </div>
                        )
                    }
                )}
            </div>
        );
    }
}

export default  CitiesList;
