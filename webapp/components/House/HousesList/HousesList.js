import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import {Link} from 'react-router';

/*Components*/
import HouseThumbInline from '../HouseThumbInline/HouseThumbInline';
import HouseThumbLarge from '../HouseThumbLarge/HouseThumbLarge';
import SvLink from './../../Common/SvLink';

import styles from './HousesList.less';

class HousesList extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        listType: PropTypes.string.isRequired
    };

    render() {
        const {cityName, housesNumber, listType} = this.props;
        const btnLabel = "All " + cityName + " homes for sale" + " (" + housesNumber + ")";

        return (
            <div>
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
                                    label={btnLabel}
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
