import React, {PropTypes} from 'react';
import {Link} from 'react-router';

/*=materialUi*/
import AppBar from 'material-ui/lib/app-bar';

/*=components*/
import AppMenu from './../AppMenu/AppMenu.js';
import settings from '../../../settings/settings.js';

/*=styles*/
import styles from './AppHeader.less'

class AppHeader extends React.Component {
    static propTypes = {
        onTouchTap: PropTypes.func.isRequired
    };

    render() {
        const {onTouchTap} = this.props;
        return (
            <AppBar className={styles.container}
                    onLeftIconButtonTouchTap={onTouchTap}
                    title={<Link to="/">
                            <ul>
                                <li className={styles.companyLogo}> <img src={settings.companyLogo} alt={settings.companyName + " Logo"} /> </li>
                                <li className={styles.companyName} > {settings.companyName} </li>
                                <li className={styles.companyPhone} > <i className="fa fa-phone"/> {settings.companyPhone} </li>
                            </ul>
                        </Link>}>
                <div className={styles.menuContainer}>
                    <AppMenu></AppMenu>
                </div>
            </AppBar>
        );
    }
}

export default AppHeader;
