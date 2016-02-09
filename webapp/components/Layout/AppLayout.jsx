import React from 'react';
import Relay from 'react-relay';

import AppCanvas from 'material-ui/lib/app-canvas';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import Colors from 'material-ui/lib/styles/colors';
import Badge from 'material-ui/lib/badge';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import IconButton from 'material-ui/lib/icon-button';
import IconNotificationsEventAvailable from 'material-ui/lib/svg-icons/notification/event-available';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ToolBar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import AppNav_Top from '../AppBar/AppNav_Top.jsx';

import {Link} from 'react-router';

import AppBar_Auth from '../AppBar/AppBar_Auth.jsx'

class AppLayout extends React.Component {
    constructor() {
        super();

        this.state = {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
            open: false,
        };
    }

    componentWillMount() {
    }

    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});

    render() {
        return (
            <AppCanvas>
                <LeftNav docked={false} open={this.state.open} onRequestChange={open => this.setState({open})}>
                    <div className="LeftNav__Header">
                        <Link to="/" onTouchTap={this.handleClose}>
                            <img
                                style={{padding:8,width:50,display:"block",float:"left"}}
                                src="http://res.cloudinary.com/svitlana/image/upload/v1453490978/remax-1st-class-logo_gjc14e.png"
                                alt="Re/Max 1st Class Realty Logo"
                            />
                        </Link>
                        <IconButton style={{color:"red",display:"block",float:"right"}}
                                    onTouchTap={this.handleClose}><NavigationClose
                        /></IconButton>
                    </div>
                    <MenuItem onTouchTap={this.handleClose} style={{textAlign:"left"}}>
                        <Link to="houses-for-sale">Houses fo Sale</Link>
                    </MenuItem>
                </LeftNav>
                <AppBar className="AppBar_Container"
                    onLeftIconButtonTouchTap={this.handleToggle} title="Re/max">
                    <ToolbarGroup className="AppNav_Top">
                        <AppNav_Top></AppNav_Top>
                    </ToolbarGroup>
                </AppBar>

                <div style={ { paddingTop: 10, paddingLeft: 4, paddingRight: 4, } }>
                    {this.props.children}
                </div>

            </AppCanvas>
        );
    }
}

AppLayout.contextTypes = {
    router: React.PropTypes.object.isRequired,
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
