import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';

/*=MaterialUi*/
import Card from '../../../../node_modules/material-ui/lib/card/card';
import CardActions from '../../../../node_modules/material-ui/lib/card/card-actions';
import CardTitle from '../../../../node_modules/material-ui/lib/card/card-title';
import Divider from '../../../../node_modules/material-ui/lib/divider';

/*=Components*/
import ButtonWithBadge from '../../Common/ButtonWithBadge.js';

class ZipTypeList extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        itemId: PropTypes.string.isRequired,
        children: PropTypes.string
    };

    render() {
        var sectionTitle = this.props.sectionTitle;
        return (
            <Card>
                <CardTitle title={sectionTitle}/>
                <Divider />
                <CardActions>
                    <ul className="list-unstyled list-inline">
                        {this.props.list.map((edge, index)=> {

                                const item = edge.node;
                                const itemId = this.props.itemId;
                                const children = this.props.children;
                                const itemValue = item[itemId];

                                const itemValueFormatted = urlToText(itemValue);

                                return (
                                    <li key={itemValue}>
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
        );
    }
}
;

export default ZipTypeList;
