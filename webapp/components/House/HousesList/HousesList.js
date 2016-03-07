import React, {PropTypes} from 'react';
import {Link} from 'react-router';
/*Components*/
import HouseThumbInline from '../HouseThumbInline/HouseThumbInline';
import Pagination from '../../Pagination/Pagination.js';
import _ from 'lodash';
/*=styles*/
// import styles from './HousesList.less';
if (process.env.BROWSER) {
    require('./HousesList.less');
}
class HousesList extends React.Component {
    static propTypes = {
        list: PropTypes.object.isRequired,
        count: PropTypes.number.isRequired,
        limit: PropTypes.number,
    };
    static defaultProps = {
        limit: 10
    };
    oneHouse = (edge)=> {
        let house = edge.node;
        let itemKey = house.id;
        let city = house.city;
        let type = house.type;
        let zip = house.zip;
        let houseInlineUrl = `/houses-for-sale/${city}/${zip}/${type}/${house.id}`;
        return (
            <div key={itemKey} className={styles.listInline}>
                <Link to={houseInlineUrl}>
                    <HouseThumbInline house={house}/>
                </Link>
            </div>
        )
    };

    render() {
        const {list, count, limit} = this.props;
        const lastCursor = _.last(list.edges).cursor;
        const firstCursor = _.first(list.edges).cursor;
        const lastPage = Math.floor(count / limit) + ((count % limit > 0) ? 1 : 0);
        const housesList = this.props.list.edges;

        return (
            <div className={styles.row}>
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
export default HousesList;
