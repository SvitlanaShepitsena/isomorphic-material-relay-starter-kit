import React, {PropTypes} from 'react';

/*Components*/
import HouseThumbLarge from '../HouseThumbLarge/HouseThumbLarge';
import SvLink from './../../Common/SvLink/SvLink';

import styles from './HousesListFiltered.less';

class HousesListFiltered extends React.Component {
    static propTypes = {
        list: PropTypes.object.isRequired,
    };
    static defaultProps = {};
    oneHouse = (edge)=> {
        let house = edge.node;
        let type = house.type + 's';
        let zip = house.zip;
        let itemKey = house.id;
        let houseThumbUrl = `${zip}/${type}/${house.id}/residential`;
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
