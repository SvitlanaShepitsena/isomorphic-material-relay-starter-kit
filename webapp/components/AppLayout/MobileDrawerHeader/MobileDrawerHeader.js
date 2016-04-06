import React, {PropTypes} from 'react';
import {Link} from 'react-router';

/*=materialUi*/
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

/*=components*/
import settings from '../../../settings/settings.js';

class MobileDrawerHeader extends React.Component {
    static propTypes = {
        onTouchTap: PropTypes.func.isRequired
    };

    render() {
        const {onTouchTap} = this.props;
        let title = {
            fontSize: 18,
            color: "#ffffff",
            fontWeight: 500
        };
        return (
            <AppBar primary={true}
                    title={<span  >
                    <Link style={title} onTouchTap={onTouchTap} to="/"> {settings.companyName} </Link>
                    </span>}
                    showMenuIconButton={false}
                    iconElementRight={
                        <IconButton onTouchTap={onTouchTap}>
                        <NavigationClose/></IconButton>
                        }
            >
            </AppBar>
        );
    }
}

export default MobileDrawerHeader
