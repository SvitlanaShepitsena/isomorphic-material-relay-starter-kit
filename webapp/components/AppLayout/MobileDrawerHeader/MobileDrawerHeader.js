import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import settings from '../../../settings/settings.js';
import styles from './MobileDrawerHeader.css';

class MobileDrawerHeader extends React.Component {
    static propTypes = {
        onTouchTap: PropTypes.func.isRequired
    };

    render() {
        return (
            <AppBar primary={true}
                    showMenuIconButton={false}
                    iconElementLeft={
                        <Link to="/" onTouchTap={this.props.onTouchTap}>
                            <img src={settings.companyLogo} alt={settings.companyName + " Logo"} />
                        </Link>
                        }
                    iconElementRight={
                        <IconButton onTouchTap={this.props.onTouchTap}>
                        <NavigationClose/></IconButton>
                        }
                    className="LeftNav__Header">
            </AppBar>
        );
    }
}

export default MobileDrawerHeader
