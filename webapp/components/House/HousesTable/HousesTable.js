import React, {PropTypes} from 'react';
import {Link} from 'react-router';
/*Components*/
import HouseTableItem from '../HouseTableItem/HouseTableItem';
import Pagination from '../../Pagination/Pagination.js';
/*=materialUi*/
import Card from 'material-ui/lib/card/card';

import styles from './HousesTable.less';

class HousesTable extends React.Component {
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
        let houseInlineUrl = `/homes-for-sale/${city}/${zip}/${type}s/${itemKey}/residential`;
        return (
            <div key={itemKey} className={styles.listInline}>
                <Link to={houseInlineUrl}>
                    <HouseTableItem house={house}/>
                </Link>
            </div>
        )
    };

    render() {
        const {list, count} = this.props;
        const lastPage = Number(Math.ceil(count / 10));
        const housesList = list.edges;

        return (
            <Card className={styles.row} style={{padding:"16px"}}>
                <Pagination lastPage={lastPage}/>
                <div className={styles.col1}>
                    <div className={styles.row}>
                        {housesList.map(this.oneHouse)}
                    </div>
                </div>
            </Card>
        );
    }
}
export default HousesTable;
