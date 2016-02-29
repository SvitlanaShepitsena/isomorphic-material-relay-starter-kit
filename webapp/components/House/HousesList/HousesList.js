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
        list: PropTypes.array.isRequired,
        count: PropTypes.number.isRequired,
        listType: PropTypes.string.isRequired
    };

    render() {
        const {list,count,listType} = this.props;
        const cityName = list[0] && list[0].city.name;


        const title = "All " + cityName + " homes for sale" + " (" + count + ")";

        const lastHouse = _.last(houses);
        const lastCursor = lastHouse && lastHouse.cursor;
        console.log('lastCursor:' + lastCursor);

        const firstHouse = _.first(houses);
        const firstCursor = firstHouse && firstHouse.cursor;
        console.log('firstCursor:' + firstCursor);

        const lastPage = Math.floor(count / 3) + ((count % 3) ? 1 : 0);
        console.log('Houses Count: ' + lastPage);

        return (
            <div>
                <Pagination  />
                <div className={styles.row}>
                    <div className={styles.col1}>
                        <div className={styles.row}>
                            {this.props.list.map((edge)=> {
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
