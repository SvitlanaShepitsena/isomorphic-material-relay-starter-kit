import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import settings from '../../settings/settings.js';

import AppCanvas from 'material-ui/lib/app-canvas';
import LeftNav from 'material-ui/lib/left-nav';

/*=components*/
import AppHeader from '../../components/AppLayout/AppHeader/AppHeader.js';
import MobileMenu from '../../components/AppLayout/MobileMenu/MobileMenu.js';
import MobileDrawerHeader from '../../components/AppLayout/MobileDrawerHeader/MobileDrawerHeader.js';

import ContactForm from '../../components/AppViews/Contact/ContactForm.js';

import AppBar_Auth from './AppBar_Auth.js'
import Footer from './AppFooterSmart.js';

/*App Color Theme*/
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from '../../settings/AppMuiTheme.js';
import styles from './AppLayout.less';

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
        console.log(styles);
        return (
            <AppCanvas style={{position:"relative",height:"100%"}}>
                <LeftNav docked={false} open={this.state.open} onRequestChange={open => this.setState({open})}>
                    <MobileDrawerHeader onTouchTap={this.handleClose}/>
                    <MobileMenu onTouchTap={this.handleClose}/>
                </LeftNav>
                <AppHeader onTouchTap={this.handleToggle}/>
                <section className={styles.contentWrapper}>
                    <div className={styles.mainContent}>
                        {this.props.children}
                    </div>
                    <div className={styles.asideContent}>
                        <ContactForm/>
                    </div>
                </section>
                <div className={styles.footer}>
                    <Footer></Footer>
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
