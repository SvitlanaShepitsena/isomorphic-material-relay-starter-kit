import React, {PropTypes} from 'react';

import Relay from 'react-relay';

import settings from '../../settings/settings.js';

/*=components*/
import Search from '../Search/SearchFormSimple.js';
import CitiesList from '../City/CitiesList/CitiesList.js';
/*=styles*/
import styles from './HomeCities.less';

class HomeCities extends React.Component {
    static propTypes = {};

    render() {
        const cities = this.props.cities.edges;
        return (
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <div className={styles.col1}>
                        {cities.length && <CitiesList list={cities} itemId="name" children="Houses"/> }
                    </div>
                </div>

            </div>
        )
    }
}

export default HomeCities;
