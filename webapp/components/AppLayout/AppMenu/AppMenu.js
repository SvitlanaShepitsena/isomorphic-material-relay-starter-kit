import React from 'react';
import {Link} from 'react-router';

/*=materialUi*/
import MenuItem from 'material-ui/lib/menus/menu-item';
/*=styles*/
import styles from './AppMenu.less';

class AppMenu extends React.Component {

    render() {
        return (
            <ul className={styles.container}>
                <li>
                    <MenuItem>
                        <Link className={styles.link}
                              to="/">Home </Link>
                    </MenuItem>
                </li>
                <li>
                    <MenuItem>
                        <Link className={styles.link}
                              to="/residential-real-estate">Search </Link>
                    </MenuItem>
                </li>
                <li>
                    <MenuItem>
                        <Link className={styles.link}
                              to="/homes-for-sale">Houses For Sale </Link>
                    </MenuItem>
                </li>
                <li>
                    <MenuItem>
                        <Link className={styles.link}
                              to="/about">About
                        </Link>
                    </MenuItem>
                </li>
                <li>
                    <MenuItem>
                        <Link className={styles.link}
                              to="/contact">Contact
                        </Link>
                    </MenuItem>
                </li>
            </ul>

        );
    }
}
export default  AppMenu;
