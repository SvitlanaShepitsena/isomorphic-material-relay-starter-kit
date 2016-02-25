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
        const {cityName, housesNumber} = this.props;
        const btnLabel = "All " + cityName + " homes for sale" + " (" + housesNumber + ")";

        return (
            <div>
                <div className={styles.container}>
                    {this.props.list.map((edge, index)=> {
                            const house = edge.node;
                            const houseThumbUrl = `${house.zip.code}/${house.type.type}/${house.id}`;
                            const houseInlineUrl = `${house.city.name}/${house.zip.code}/${house.type.type}/${house.id}`;
                            return (
                                <div className={styles.gridColsClass} key={index}>
                                    {this.props.listType == "large" &&
                                    <SvLink url={houseThumbUrl}>
                                        <HouseThumbLarge house={house}/>
                                    </SvLink>
                                    }
                                    {this.props.listType == "inline" &&
                                    <Link to={`/houses-for-sale/${houseInlineUrl}`}>
                                        <HouseThumbInline house={house}/>
                                    </Link>
                                    }
                                </div>
                            )
                        }
                    )}
                </div>
                {this.props.listType == "large" &&
                <div className={styles.btnContainer}>
                    <SvLink url="all" className={styles.button}>
                        <RaisedButton
                            label={btnLabel}
                            secondary={true}/>
                    </SvLink>
                </div>
                }
            </div>
        );
    }
}
export default HousesList;
