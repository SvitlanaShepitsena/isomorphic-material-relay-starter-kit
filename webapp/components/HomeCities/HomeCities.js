import React, {PropTypes} from 'react';

/*=components*/
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
                        {cities.length &&
                        <CitiesList list={cities} fullUrl="houses-for-sale/" itemId="name" children="Houses"/>
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default HomeCities;
