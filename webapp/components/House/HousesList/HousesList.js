import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import {Link} from 'react-router';

/*Components*/
import HouseThumbInline from '../HouseThumbInline/HouseThumbInline';
import HouseThumbLarge from '../HouseThumbLarge/HouseThumbLarge';
import SvLink from './../../Common/SvLink';
import Pagination from '../../Pagination/Pagination.js';

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
        const {list, count, listType,limit} = this.props;
        const {pageInfo} = list;
        const cityName = list[0] && list[0].city.name;
        const lastPage = Math.floor(count / limit) + ((count % limit > 0) ? 1 : 0);

        const title = "All " + cityName + " homes for sale" + " (" + count + ")";

        return (
            <div>
                <div lassName={styles.row}>
                    <Pagination lastPage={lastPage} pageInfo={list.pageInfo} />
                    <div className={styles.col1}>
                        <div className={styles.row}>
                            {this.props.list.edges.map((edge)=> {
                                    let house = edge.node;
                                    let itemKey = house.id;
                                    let city = house.city.name;
                                    let type = house.type.type;
                                    let zip = house.zip.code;
                                    let houseThumbUrl = `${zip}/${type}/${house.id}`;
                                    let houseInlineUrl = `${city}/${zip}/${type}/${house.id}`;
                                    return (
                                        <div key={itemKey}
                                             className={(listType == "large") ? styles.col2 : styles.listInline}>
                                            {listType == "large" &&
                                            <SvLink url={houseThumbUrl}>
                                                <HouseThumbLarge house={house}/>
                                            </SvLink>
                                            }
                                            {listType == "inline" &&
                                            <Link to={`/houses-for-sale/${houseInlineUrl}`}>
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
                {listType == "large" &&
                <div className={styles.row}>
                    <div className={styles.col1}>
                        <div className={styles.btnContainer}>
                            <SvLink url="all">
                                <RaisedButton
                                    label={title}
                                    secondary={true}/>
                            </SvLink>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}
export default HousesList;
