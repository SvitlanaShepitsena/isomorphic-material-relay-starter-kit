import React, {PropTypes} from 'react';
import {Link} from 'react-router';

/*=materialUi*/
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

/*=components*/
import settings from '../../../settings/settings.js';

/*=styles*/
import styles from './MobileDrawerHeader.less';

class MobileDrawerHeader extends React.Component {
    static propTypes = {
        onTouchTap: PropTypes.func.isRequired
    };

    render() {
        return (
            <AppBar primary={true}
                    title={<span className={styles.title}>
                    {settings.companyName}
                    </span>}
                    showMenuIconButton={false}
                    iconElementRight={
                        <IconButton onTouchTap={this.props.onTouchTap}>
                        <NavigationClose/></IconButton>
                        }
            >
            </AppBar>
        );
    }
}

export default MobileDrawerHeader
