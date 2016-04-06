import React, {PropTypes} from 'react';
import _ from 'lodash';

/*Components*/
import HouseThumbLarge from '../HouseThumbLarge/HouseThumbLarge';
import SvLink from './../../Common/SvLink/SvLink';
import typePlural from '../../../utils/typePlural.js';
/*=styles*/
import styles from './HousesListFiltered.less';

class HousesListFiltered extends React.Component {
    static propTypes = {
        list: PropTypes.object.isRequired,
    };
    static defaultProps = {};
    oneHouse = (edge)=> {
        let house = edge.node;
<<<<<<< HEAD
        let type = house.type + 's';
        let zip = house.zip;
        let itemKey = house.id;
        let houseThumbUrl = `${zip}/${type}/${house.id}/residential`;
=======
        let type = house.type;
        let housesType = typePlural(type);

        let zip = house.zip;
        let itemKey = house.id;
        let houseThumbUrl = `${zip}/${housesType}/${house.id}/residential`;
>>>>>>> work-local
        return (
            <div key={itemKey} className={styles.col3}>
                <SvLink url={houseThumbUrl}>
                    <HouseThumbLarge house={house}/>
                </SvLink>
            </div>
        )
    };

    render() {
        const housesList = this.props.list.edges;
        return (
            <div className={styles.row}>
                {housesList.map(this.oneHouse)}
            </div>
        );
    }
}
export default HousesListFiltered;
