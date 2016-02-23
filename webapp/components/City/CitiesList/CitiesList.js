import React, {PropTypes} from 'react';
import {Link} from 'react-router';

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
        children: PropTypes.string
    };

    render() {
        return (
            <div className={styles.container}>
                {this.props.list.map(edge => {
                        const item = edge.node;
                        const itemId = this.props.itemId;
                        const children = this.props.children;
                        const itemValue = item[itemId];

                        return (
                            <div className={styles.item} key={itemValue}>
                                <SvLink url={itemValue} style={{padding: 16}}>
                                    <CityThumbPicture
                                        housesLength={item[`${children}_Count`]}
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
