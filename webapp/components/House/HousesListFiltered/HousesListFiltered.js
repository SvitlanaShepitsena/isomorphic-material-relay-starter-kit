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
        let itemKey = house.id;
        let type = house.type.type;
        let zip = house.zip.code;
        let houseThumbUrl = `${zip}/${type}/${house.id}`;
        return (
            <div key={itemKey} className={styles.col2}>
                <SvLink url={houseThumbUrl}>
                    <HouseThumbLarge house={house}/>
                </SvLink>
            </div>
        )
    };

    render() {
        return (
            <div className={styles.row}>
                {this.props.list.edges.map(this.oneHouse)}
            </div>
        );
    }
}
export default HousesListFiltered;
