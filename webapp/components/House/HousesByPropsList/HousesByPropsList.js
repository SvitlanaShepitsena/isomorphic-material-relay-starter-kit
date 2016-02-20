import React, {PropTypes} from 'react';
import _ from 'lodash';

/*=MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import Divider from 'material-ui/lib/divider';
import Badge from 'material-ui/lib/badge';

/*=Components*/
import SvLink from './../../Common/SvLink';

/*Inline Styles*/
import style from '../../../settings/AppMuiTheme.js';

class HousesByPropsList extends React.Component {
    static propTypes = {
        item: PropTypes.string.isRequired
    };

    render() {
        var defaultBadgeStyle = {
            backgroundColor: style.palette.default3Color,
            color: style.palette.textColor,
            top: 18,
            right: 18
        };
        var defaultBtnLabelStyle = {
            color: style.palette.primary2Color,
            fontSize: 15,
            fontWeight: 500
        };
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
                                var btnLabelFormatted = _.startCase(btnLabel.replace(/-+/g, ' '));
                                return (
                                    <li key={index}>
                                        <Badge badgeContent={badgeValue}
                                               badgeStyle={badgeStyle ? badgeStyle : defaultBadgeStyle}
                                        >
                                            <SvLink url={svLinkUrl}>
                                                <FlatButton
                                                    labelStyle={btnLabelStyle ? btnLabelStyle: defaultBtnLabelStyle}
                                                    primary={true}
                                                    label={btnLabelFormatted}/>
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
