import React from 'react';
import Relay from 'react-relay';

import AppCanvas from 'material-ui/lib/app-canvas';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';

import IconButton from 'material-ui/lib/icon-button';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

import AppNav_Top from '../AppBar/AppNav_Top.jsx';
import {Link} from 'react-router';
import AppBar_Auth from '../AppBar/AppBar_Auth.jsx'

/*App Color Theme*/
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from '../Shared/AppMuiTheme.js';

class AppLayout extends React.Component {

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
        };
    }

    state = {
        open: false
    };

    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});

    render() {
        return (
            <AppCanvas>
                <LeftNav docked={false} open={this.state.open} onRequestChange={open => this.setState({open})}>
                    <AppBar primary={true}
                            showMenuIconButton={false}
                            iconElementLeft={
                        <Link to="/" onTouchTap={this.handleClose}>
                            <img
                                style={{padding:8,width:50}}
                                src="http://res.cloudinary.com/svitlana/image/upload/v1453490978/remax-1st-class-logo_gjc14e.png"
                                alt="Re/Max 1st Class Realty Logo"
                            />
                        </Link>
                        }
                            iconElementRight={
                        <IconButton style={{color:"red",display:"block",float:"right"}}
                                    onTouchTap={this.handleClose}><NavigationClose
                        /></IconButton>
                        }
                            className="LeftNav__Header">
                    </AppBar>

                    <MenuItem onTouchTap={this.handleClose}>
                        <Link to="houses-for-sale">Houses fo Sale</Link>
                    </MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>
                        <Link to="houses-for-rent">Houses fo Rent</Link>
                    </MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>
                        <Link to="houses-for-rent">Houses fo Rent</Link>
                    </MenuItem>
                </LeftNav>
                <AppBar className="AppBar_Container"
                        onLeftIconButtonTouchTap={this.handleToggle}
                        title={<Link className="AppBar__title"  to="/">
                        <ul className="AppBar__title-ul">
                        <li> <img className="AppBar__logo-img" src="http://res.cloudinary.com/svitlana/image/upload/v1453490978/remax-1st-class-logo_gjc14e.png" alt="Re/Max 1st Class Realty Logo" /> </li>
                        <li className="AppBar__title-li-text"> Re/Max 1st Class Realty </li> </ul>
                        </Link>}>
                    <div className="AppNav_Top">
                        <AppNav_Top></AppNav_Top>
                    </div>
                </AppBar>

                <div className="AppLayout__content">
                    {this.props.children}
                </div>

            </AppCanvas>
        );
    }
}

AppLayout.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

AppLayout.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

export default Relay.createContainer(AppLayout, {
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        ${AppBar_Auth.getFragment('Viewer')},
      }
    `,
    },
});
