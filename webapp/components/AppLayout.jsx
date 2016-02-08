import React from 'react';
import Relay from 'react-relay';

import AppCanvas from 'material-ui/lib/app-canvas';
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
import {Link} from 'react-router';

import AppBar_Auth from './AppBar_Auth.jsx'
import AppBar_NavigationMenu from './AppBar_NavigationMenu.jsx'

class AppLayout extends React.Component {
    constructor() {
        super();

        this.state = {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
        };
    }

    componentWillMount() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.deepOrange500,
        });

        this.setState({muiTheme: newMuiTheme});
    }

    render() {

        return (
            <AppCanvas>
                <ToolBar
                    style={ {
            backgroundColor: 'rgba(125, 88, 88, 0.06)',
            boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
          } }
                >
                    <ToolbarGroup firstChild={true} float="left">
                        <AppBar_NavigationMenu />
                    </ToolbarGroup>
                    <ToolbarGroup float="left">
                        <ToolbarTitle text="Re/Max 1st Class"/>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <Link to="/">Home</Link>
                        <Link to="houses-for-sale">Houses For Sale</Link>
                    </ToolbarGroup>
                    <ToolbarGroup float="right">
                        <AppBar_Auth Viewer={this.props.Viewer}/>
                    </ToolbarGroup>
                </ToolBar>

                <div style={ { paddingTop: 10, paddingLeft: 4, paddingRight: 4, } }>
                    {this.props.children}
                </div>

            </AppCanvas>
        )
    }
}
;

//

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
