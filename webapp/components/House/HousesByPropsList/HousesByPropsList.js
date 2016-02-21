import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import Divider from 'material-ui/lib/divider';

/*=Components*/
import ButtonWithBadge from '../../Common/ButtonWithBadge.js';

class HousesByPropsList extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        item: PropTypes.string.isRequired
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
                                var badgeValue = edge.node.Houses_Count;
                                var btnUrl = edge.node[this.props.item];
                                var btnLabel = edge.node[this.props.item];
                                var btnLabelFormatted = urlToText(btnLabel);
                                return (
                                    <li key={index}>
                                        <ButtonWithBadge
                                            btnLabel={btnLabelFormatted}
                                            btnUrl={btnUrl}
                                            badgeValue={badgeValue}
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

export default HousesByPropsList;
