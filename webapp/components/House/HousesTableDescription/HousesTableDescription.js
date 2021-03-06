import React, {PropTypes} from 'react';
import {Link} from 'react-router';
/*Components*/
import typePlural from '../../../utils/typePlural.js';
import HouseTableItemDescription from '../HouseTableItemDescription/HouseTableItemDescription';
import Pagination from '../../Pagination/Pagination.js';
/*=styles*/
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
        let housesType = typePlural(type);

        let houseInlineUrl = `/homes-for-sale/${city}/${zip}/${housesType}/${itemKey}/residential`;
        return (
            <div key={itemKey} className={styles.listInline}>
                <Link className={styles.linkDescription} to={houseInlineUrl}>
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
            <div className={styles.row}>
                <Pagination lastPage={lastPage}/>
                <div className={styles.col1}>
                    <div className={styles.row}>
                        {housesList.map(this.oneHouse)}
                    </div>
                </div>
                <Pagination lastPage={lastPage}/>
            </div>
        );
    }
}
export default HousesTableDescription;
