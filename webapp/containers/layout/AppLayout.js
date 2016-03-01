import React from 'react';
import Relay from 'react-relay';

import AppCanvas from 'material-ui/lib/app-canvas';
import LeftNav from 'material-ui/lib/left-nav';

/*=components*/
import AppHeader from '../../components/AppLayout/AppHeader/AppHeader.js';
import AppBar_Auth from '../auth/UserAuth_Smart.js';
import MobileMenu from '../../components/AppLayout/MobileMenu/MobileMenu.js';
import MobileDrawerHeader from '../../components/AppLayout/MobileDrawerHeader/MobileDrawerHeader.js';
import Footer from '../../components/AppLayout/Footer/FooterContent.js';
import ContactForm from '../../components/AppViews/Contact/ContactForm.js';


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

    state = {open: false};

    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});

    render() {
        let {pathname} = this.props.location;
        let {children} = this.props;
        let cityRoute = pathname == '/houses-for-sale';
        let homeRoute = pathname == '/';

        return (
            <AppCanvas style={{position:"relative",height:"100%"}}>
                <LeftNav docked={false} open={this.state.open} onRequestChange={open => this.setState({open})}>
                    <MobileDrawerHeader onTouchTap={this.handleClose}/>
                    <MobileMenu onTouchTap={this.handleClose}/>
                </LeftNav>
                <AppHeader onTouchTap={this.handleToggle}/>
                <div className={styles.wrapper}>
                    {homeRoute && <section> {children} </section> }
                    {!homeRoute &&
                    <section className={styles.contentWrapper}>
                        <div className={styles.mainContent}>
                            {children}
                        </div>
                        <div className={styles.asideContent}>
                            {cityRoute && <ContactForm/>}
                        </div>
                    </section>
                    }
                </div>
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
