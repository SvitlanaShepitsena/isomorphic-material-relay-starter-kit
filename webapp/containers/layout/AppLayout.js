import React from 'react';
import Relay from 'react-relay';

import AppCanvas from 'material-ui/lib/app-canvas';
import LeftNav from 'material-ui/lib/left-nav';

/*=components*/
import AppHeader from '../../components/AppLayout/AppHeader/AppHeader.js';
import MobileMenu from '../../components/AppLayout/MobileMenu/MobileMenu.js';
import MobileDrawerHeader from '../../components/AppLayout/MobileDrawerHeader/MobileDrawerHeader.js';
import Footer from '../../components/AppLayout/Footer/FooterContent.js';

/*App Color Theme*/
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import muiPalette from '../../settings/MuiPalette.js';

class AppLayout extends React.Component {
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(muiPalette),
        };
    }

    state = {open: false};

    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});

    mobileNav() {
        var styles = require('./AppLayout.less');
        let openMenu = this.state.open;
        return (
            <LeftNav docked={false} open={openMenu} onRequestChange={open => this.setState({open})}>
                <MobileDrawerHeader onTouchTap={this.handleClose}/>
                <MobileMenu onTouchTap={this.handleClose}/>
            </LeftNav>
        );
    }

    appContent() {
        var styles = require('./AppLayout.less');
        let {children} = this.props;
        let {pathname} = this.props.location;
        let homeRoute = pathname == '/';
        let cityRoute = pathname == '/houses-for-sale';
        return (
            <div className={styles.layoutWrapper}>
                {homeRoute &&
                <section> {children} </section>
                }
                {!homeRoute &&
                <section className={styles.contentWrapper}>
                    <div className={styles.mainContent}>
                        {children}
                    </div>
                    <div className={styles.asideContent}>
                        {/*                        {cityRoute && <ContactForm/>}*/}
                    </div>
                </section>
                }
            </div>
        )
    };

    render() {
        var styles = require('./AppLayout.less');
        return (
            <AppCanvas style={{position:"relative", height:"100%"}}>
                <AppHeader onTouchTap={this.handleToggle}/>
                {this.mobileNav()}
                {this.appContent()}
                <Footer/>
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

export default AppLayout;
