import React from 'react';
import {Link} from 'react-router';
import styles from '../../../settings/AppMuiTheme.js';
import settings from '../../../settings/settings.js';

class FooterContent extends React.Component {

    render() {
        var footerStyle = {
            backgroundColor: styles.palette.footerColor,
            color: styles.palette.footerText,
        };
        var footerMenuHeader = {
            fontWeight: 500,
            color: styles.palette.footerHeaderText,
            textTransform: 'uppercase',
            margin: 0,
            fontSize: 15

        };
        return (
            <footer className="Footer" style={footerStyle}>
                <div className="container">
                    <div className="row">
                        <div className="four columns Footer__section">
                            <h3 className="Footer__section-header" style={footerMenuHeader}>{settings.companyName}</h3>
                            <ul className="list-unstyled">
                                <li>
                                    <span>{settings.companyAddress}</span>
                                </li>
                                <li>
                                    <span>{settings.companyCity + " " + settings.companyState + ", " + settings.companyZip}</span>
                                </li>

                                <li>
                                    <span>
                                        {"Phone: " + settings.companyPhone}
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        {"Fax: " + settings.companyFax}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="four columns Footer__section">
                            <h3 className="Footer__section-header" style={footerMenuHeader}>Keep in touch</h3>
                            <ul className="Footer__address list-unstyled">
                                <li>
                                    <a href={settings.links.facebook}>Facebook</a>
                                </li>
                                <li>
                                    <a href={settings.links.google}>Google Plus</a>
                                </li>
                                <li>
                                    <a href={settings.links.twitter}>Twitter</a>
                                </li>
                                <li>
                                    <a href={settings.links.linkedin}>LinkedIn</a>
                                </li>
                            </ul>
                        </div>
                        <div className="four columns Footer__section">
                            <h3 className="Footer__section-header" style={footerMenuHeader}>Do you like our
                                company?</h3>
                            <ul className="Footer__address list-unstyled">
                                <li>
                                    <Link to="/about">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/terms">Terms of use</Link>
                                </li>
                                <li>
                                    <Link to="/privacy">Privacy Policy</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </footer>
        );
    }
}
export default FooterContent;
