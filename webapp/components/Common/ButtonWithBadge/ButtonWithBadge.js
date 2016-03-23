import React, {PropTypes} from 'react';

/*=MaterialUi*/
import FlatButton from 'material-ui/lib/flat-button';
import Badge from 'material-ui/lib/badge';

/*=Components*/
import SvLink from './../SvLink/SvLink';

/*Inline Styles*/
import muiPalette from '../../../settings/MuiPalette.js';

class ButtonWithBadge extends React.Component {
    static propTypes = {
        btnLabel: PropTypes.string.isRequired,
        btnUrl: PropTypes.string.isRequired,
        badgeValue: PropTypes.number.isRequired
    };

    render() {
        let defaultBadgeStyle = {
            backgroundColor: muiPalette.palette.default3Color,
            color: muiPalette.palette.textColor,
            right: 18,
            top: 0
        };
        let defaultBtnLabelStyle = {
            color: muiPalette.palette.primary2Color,
            fontSize: 12,
            fontWeight: 500
        };
        let {btnLabelStyle, badgeStyle, btnLabel, btnUrl, badgeValue} = this.props;

        return (
            <Badge badgeContent={badgeValue} badgeStyle={badgeStyle ? badgeStyle : defaultBadgeStyle}>
                <SvLink url={btnUrl} removePage={this.props.removePage}>
                    <FlatButton
                        labelStyle={btnLabelStyle ? btnLabelStyle: defaultBtnLabelStyle}
                        primary={true}
                        label={btnLabel}/>
                </SvLink>
            </Badge>
        );
    }
}

export default  ButtonWithBadge;
