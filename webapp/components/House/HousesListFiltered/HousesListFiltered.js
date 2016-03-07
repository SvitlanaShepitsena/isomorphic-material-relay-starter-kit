import React, {PropTypes} from 'react';

/*Components*/
import HouseThumbLarge from '../HouseThumbLarge/HouseThumbLarge';
import SvLink from './../../Common/SvLink/SvLink';
/*=styles*/
// import styles from './HousesListFiltered.less';
if (process.env.BROWSER) {
    require('./HousesListFiltered.less');
}

class HousesListFiltered extends React.Component {
    static propTypes = {
        list: PropTypes.object.isRequired,
    };
    static defaultProps = {};
    oneHouse = (edge)=> {
        let house = edge.node;
        let itemKey = house.id;
        let type = house.type;
        let zip = house.zip;
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
        const housesList = this.props.list.edges;
        return (
            <div className={styles.row}>
                {housesList.map(this.oneHouse)}
            </div>
        );
    }
}
export default HousesListFiltered;
