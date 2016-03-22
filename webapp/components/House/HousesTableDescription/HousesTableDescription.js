import React, {PropTypes} from 'react';
import {Link} from 'react-router';
/*Components*/
import HouseTableItemDescription from '../HouseTableItemDescription/HouseTableItemDescription';
import Pagination from '../../Pagination/Pagination.js';
/*=materialUi*/


import styles from './HousesTableDescription.less';

class HousesTableDescription extends React.Component {
    static propTypes = {
        list: PropTypes.object.isRequired,
        count: PropTypes.number.isRequired,
        limit: PropTypes.number
    };
    static defaultProps = {
        limit: 10
    };
    oneHouse = (edge)=> {

        let house = edge.node;
        let {city, type, zip} = house;
        let itemKey = house.id;
        let houseInlineUrl = `/houses-for-sale/${city}/${zip}/${type}s/${itemKey}/residential`;
        return (
            <div key={itemKey} className={styles.listInline}>
                <Link to={houseInlineUrl}>
                    <HouseTableItemDescription house={house}/>
                </Link>
            </div>
        )
    };

    render() {
        const {list, count} = this.props;
        const lastPage = Number(Math.ceil(count / 10));
        const housesList = list.edges;

        return (
            <div className={styles.row} >
                <Pagination lastPage={lastPage}/>
                <div className={styles.col1}>
                    <div className={styles.row}>
                        {housesList.map(this.oneHouse)}
                    </div>
                </div>
            </div>
        );
    }
}
export default HousesTableDescription;