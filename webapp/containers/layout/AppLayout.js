import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import settings from '../../settings/settings.js';

import AppCanvas from 'material-ui/lib/app-canvas';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import ContactForm from '../../components/Contact/ContactForm.js';

/*Components*/
import AppNav_Top from './AppNav_Top.js';
import AppBar_Auth from './AppBar_Auth.js'
import Footer from './AppFooterSmart.js';

/*App Color Theme*/
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from '../../settings/AppMuiTheme.js';

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
            <AppCanvas style={{position:"relative",height:"100%"}} className="AppLayout">
                <LeftNav docked={false} open={this.state.open} onRequestChange={open => this.setState({open})}>
                    <AppBar primary={true}
                            showMenuIconButton={false}
                            iconElementLeft={
                        <Link to="/" onTouchTap={this.handleClose}>
                            <img
                                style={{padding:8,width:50}}
                                src="http://res.cloudinary.com/svitlana/image/upload/v1453490978/remax-1st-class-logo_gjc14e.png"
                                alt={settings.companyName + " Logo"}
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
                        <Link to="/houses-for-sale">Houses fo Sale</Link>
                    </MenuItem>
                    {/*                    <MenuItem onTouchTap={this.handleClose}>
                     <Link to="/houses-for-rent">Houses fo Rent</Link>
                     </MenuItem>*/}
                    <MenuItem onTouchTap={this.handleClose}>
                        <Link to="/about">About Us</Link>
                    </MenuItem>
                </LeftNav>
                <AppBar className="AppBar_Container"
                        onLeftIconButtonTouchTap={this.handleToggle}
                        title={<Link className="AppBar__title"  to="/">
                        <ul className="AppBar__title-ul">
                        <li> <img className="AppBar__logo-img" src="http://res.cloudinary.com/svitlana/image/upload/v1453490978/remax-1st-class-logo_gjc14e.png" alt={settings.companyName + " Logo"} /> </li>
                        <li className="AppBar__title-li-text"> {settings.companyName} </li> </ul>
                        </Link>}>
                    <div className="AppNav_Top">
                        <AppNav_Top></AppNav_Top>
                    </div>
                </AppBar>

                <div className="container">
                    <div className="row">
                        <div className="eight columns">
                            <div className="AppLayout__content">
                                {this.props.children}
                            </div>
                        </div>
                        <div className="four columns">
                            <div className="AppLayout__aside">
                                <ContactForm/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
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
