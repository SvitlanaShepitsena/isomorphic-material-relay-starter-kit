import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import MenuItem from 'material-ui/lib/menus/menu-item';
/*=styles*/
import styles from './MobileMenu.less';

class MobileMenu extends React.Component {
    static propTypes = {
        onTouchTap: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className={styles.container}>
                <MenuItem onTouchTap={this.props.onTouchTap}>
                    <Link className={styles.link}
                          to="/houses-for-sale">Houses fo Sale</Link>
                </MenuItem>
                {/*                    <MenuItem onTouchTap={this.handleClose}>
                 <Link to="/houses-for-rent">Houses fo Rent</Link>
                 </MenuItem>*/}
                <MenuItem onTouchTap={this.props.onTouchTap}>
                    <Link className={styles.link}
                          to="/about">About Us</Link>
                </MenuItem>
            </div>
        );
    }
}

export default MobileMenu;