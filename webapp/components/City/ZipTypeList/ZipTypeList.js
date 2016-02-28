import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';

/*=materialUi*/
import Card from '../../../../node_modules/material-ui/lib/card/card';
import CardActions from '../../../../node_modules/material-ui/lib/card/card-actions';
import CardTitle from '../../../../node_modules/material-ui/lib/card/card-title';
import Divider from '../../../../node_modules/material-ui/lib/divider';
/*=styles*/
import styles from './ZipTypeList.less';

/*=Components*/
import ButtonWithBadge from '../../Common/ButtonWithBadge.js';
/*=*/
class ZipTypeList extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        itemId: PropTypes.string.isRequired,
        children: PropTypes.string,
        sectionTitle: PropTypes.string
    };

    render() {
        var {sectionTitle} = this.props;
        return (
            <div className={styles.row}>
                <Card className={styles.col1}>
                    <CardTitle title={sectionTitle}/>
                    <Divider />
                    <CardActions>
                        <ul>
                            {this.props.list.map(edge=> {
                                    const item = edge.node;
                                    const {itemId, children} = this.props;

                                    const itemValue = item[itemId];
                                    const itemValueFormatted = urlToText(itemValue);
                                    // Temporary Solution for creating a new route for houses type
                                    return (
                                        <li className={styles.item} key={itemValue}>
                                            <ButtonWithBadge
                                                btnLabel={itemValueFormatted}
                                                btnUrl={itemValue}
                                                badgeValue={item[`${children}_Count`]}
                                            />
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default ZipTypeList;
