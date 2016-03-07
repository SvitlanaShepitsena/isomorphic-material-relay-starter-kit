import React, {PropTypes} from 'react';

/*=components*/
import CitiesList from '../City/CitiesList/CitiesList.js';
/*=styles*/
import styles from './HomeCities.less';

class HomeCities extends React.Component {

    render() {
        const citiesList = this.props.cities.edges;
        const cities = citiesList.length;

        const cityUrl = "houses-for-sale/";
        const itemId = "name";
        const cityChildren = "Houses";
        return (
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <div className={styles.col1}>
                        {cities &&
                        <CitiesList list={citiesList}
                                    fullUrl={cityUrl}
                                    itemId={itemId}
                                    children={cityChildren}
                        />}
                    </div>
                </div>

            </div>
        )
    }
}

export default HomeCities;
