import React, {PropTypes} from 'react';

/*=MaterialUi*/
import FlatButton from 'material-ui/lib/flat-button';
import Badge from 'material-ui/lib/badge';

/*=Components*/
import SvLink from './../SvLink/SvLink';

/*Inline Styles*/
import style from '../../../settings/AppMuiTheme.js';

class ButtonWithBadge extends React.Component {
    static propTypes = {
        btnLabel: PropTypes.string.isRequired,
        btnUrl: PropTypes.string.isRequired,
        badgeValue: PropTypes.number.isRequired
    };

    render() {
        let defaultBadgeStyle = {
            backgroundColor: style.palette.default3Color,
            color: style.palette.textColor,
            top: 18,
            right: 18
        };
        let defaultBtnLabelStyle = {
            color: style.palette.primary2Color,
            fontSize: 15,
            fontWeight: 500
        };
        let {btnLabelStyle, badgeStyle, btnLabel, btnUrl, badgeValue} = this.props;

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
