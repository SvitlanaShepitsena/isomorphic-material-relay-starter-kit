import React, {PropTypes} from 'react';

/*=MaterialUi*/
import FlatButton from 'material-ui/lib/flat-button';
import Badge from 'material-ui/lib/badge';

/*=Components*/
import SvLink from './SvLink';

/*Inline Styles*/
import style from '../../settings/AppMuiTheme.js';

class ButtonWithBadge extends React.Component {
    static propTypes = {
        btnLabel: PropTypes.string.isRequired,
        btnUrl: PropTypes.string.isRequired,
        badgeValue: PropTypes.number.isRequired
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
        var btnLabelStyle = this.props.btnLabelStyle;
        var badgeStyle = this.props.badgeStyle;

        var btnLabel = this.props.btnLabel;
        var btnUrl = this.props.btnUrl;
        var badgeValue = this.props.badgeValue;

        return (
            <div>
                <Badge badgeContent={badgeValue}
                       badgeStyle={badgeStyle ? badgeStyle : defaultBadgeStyle}
                >
                    <SvLink url={btnUrl}>
                        <FlatButton
                            labelStyle={btnLabelStyle ? btnLabelStyle: defaultBtnLabelStyle}
                            primary={true}
                            label={btnLabel}/>
                    </SvLink>
                </Badge>
            </div>
        );
    }
}

export default  ButtonWithBadge;
