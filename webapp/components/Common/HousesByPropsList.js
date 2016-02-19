import React, {PropTypes} from 'react';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';
import Badge from 'material-ui/lib/badge';

/*=Components*/
import SvLink from './SvLink';
import MyTheme from '../../settings/AppMuiTheme.js';

class HousesByPropsList extends React.Component {
    static propTypes = {
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
                                var btnLabelStyle = this.props.btnLabelStyle;
                                var badgeStyle = this.props.badgeStyle;

                                var badgeValue = edge.node.Houses_Count;
                                var svLinkUrl = edge.node[this.props.item];
                                var btnLabel = edge.node[this.props.item];
                                return (
                                    <li key={index}>
                                        <Badge badgeContent={badgeValue}
                                               badgeStyle={badgeStyle}
                                        >
                                            <SvLink url={svLinkUrl}>
                                                <FlatButton
                                                    labelStyle={btnLabelStyle}
                                                    label={btnLabel}/>
                                            </SvLink>
                                        </Badge>
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
