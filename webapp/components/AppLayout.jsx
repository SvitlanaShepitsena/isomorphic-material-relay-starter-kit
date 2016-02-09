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

import {Link} from 'react-router';

import AppBar_Auth from './AppBar_Auth.jsx'

class AppLayout extends React.Component {
    constructor() {
        super();

        this.state = {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
            open: false,
        };
    }

    componentWillMount() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.deepOrange500,
        });

        this.setState({muiTheme: newMuiTheme});
    }

    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});

    render() {

        return (
            <AppCanvas>
                <LeftNav
                    docked={false}
                    open={this.state.open}
                    onRequestChange={open => this.setState({open})}
                >
                    <AppBar
                        iconElementLeft={<IconButton><NavigationClose  /></IconButton>}
                        onLeftIconButtonTouchTap={this.handleClose()}
                    >

                    </AppBar>
                    <MenuItem onTouchTap={this.handleClose}>
                        <Link className="MenuItem__Link" to="/">Home</Link>
                    </MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>
                        <Link to="houses-for-sale">Houses fo Sale</Link>
                    </MenuItem>
                </LeftNav>
                <AppBar
                    onLeftIconButtonTouchTap={this.handleToggle}
                    title="Re/max"
                >
                    <ToolbarGroup>
                        <ul style={{textAlign:'right'}}>
                            <li style={{display:'inline-block'}}>
                                <Link
                                    style={{textDecoration:'none',padding:'16px 8px',margin:5, fontSize:15,color:"393939"}}
                                    to="/">Home</Link>
                            </li>
                            <li style={{display:'inline-block'}}>
                                <Link
                                    style={{textDecoration:'none',padding:'16px 8px',margin:5, fontSize:15,color:"393939"}}
                                    to="houses-for-sale">Houses For
                                    Sale</Link>
                            </li>
                        </ul>
                    </ToolbarGroup>
                    <ToolbarGroup float="right">
                        <AppBar_Auth Viewer={this.props.Viewer}/>
                    </ToolbarGroup>
                </AppBar>

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
