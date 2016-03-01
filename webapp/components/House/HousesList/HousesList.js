import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import {Link} from 'react-router';

/*Components*/
import HouseThumbInline from '../HouseThumbInline/HouseThumbInline';
import HouseThumbLarge from '../HouseThumbLarge/HouseThumbLarge';
import SvLink from './../../Common/SvLink/SvLink';
import Pagination from '../../Pagination/Pagination.js';
import _ from 'lodash';

import styles from './HousesList.less';

class HousesList extends React.Component {
    static propTypes = {
        list: PropTypes.object.isRequired,
        count: PropTypes.number.isRequired,
        listType: PropTypes.string.isRequired,
        limit: PropTypes.number,
    };
    static defaultProps = {
        limit: 3
    };

    render() {
        const {list, count, listType, limit} = this.props;
        const lastCursor = _.last(list.edges).cursor;
        const firstCursor = _.first(list.edges).cursor;

        const lastPage = Math.floor(count / limit) + ((count % limit > 0) ? 1 : 0);

        return (
            <div className={styles.row}>
                <Pagination lastPage={lastPage} firstCursor={firstCursor} lastCursor={lastCursor}/>
                <div className={styles.col1}>
                    <div className={styles.row}>
                        {this.props.list.edges.map((edge)=> {
                                let house = edge.node;
                                let itemKey = house.id;
                                let city = house.city.name;
                                let type = house.type.type;
                                let zip = house.zip.code;
                                let houseThumbUrl = `${zip}/${type}/${house.id}`;
                                let houseInline = `${city}/${zip}/${type}/${house.id}`;
                                let houseInlineUrl = `/houses-for-sale/${houseInline}`;
                                let listLarge = (listType == "large");
                                let listInline = (listType == "inline");
                                let thumbClass = listLarge ? styles.col2 : styles.listInline;
                                return (
                                    <div key={itemKey} className={thumbClass}>
                                        {listLarge &&
                                        <SvLink url={houseThumbUrl}>
                                            <HouseThumbLarge house={house}/>
                                        </SvLink>
                                        }
                                        {listInline &&
                                        <Link to={houseInlineUrl}>
                                            <HouseThumbInline house={house}/>
                                        </Link>
                                        }
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default HousesList;
