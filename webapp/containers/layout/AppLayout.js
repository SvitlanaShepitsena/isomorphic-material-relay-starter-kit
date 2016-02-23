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
import style from './AppLayout.css';

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
                    <MobileDrawerHeader onTouchTap={this.handleClose}/>
                    <MobileMenu onTouchTap={this.handleClose}/>
                </LeftNav>
                <AppHeader onTouchTap={this.handleToggle}/>
                <div className="AppLayout__content">
                    <div className="container">
                        <div className={style.svCenter}>
                            <div className={style.svStyle}>
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                                    voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
                                    occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
                                    mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
                                    expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
                                    nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
                                    assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis
                                    debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et
                                    molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut
                                    reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus
                                    asperiores repellat</p>
                                <div >
                                    {this.props.children}
                                    <br/>
                                </div>
                            </div>
                            <div className="four columns">
                                <div className="AppLayout__aside">
                                    <ContactForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </AppCanvas>
        )
            ;
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
