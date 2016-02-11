import React from 'react';
import {Link} from 'react-router';
import theme from '../../components/shared/AppMuiTheme.js';

export default class FooterContent extends React.Component {

    render() {
        var footerStyle = {
            backgroundColor: theme.palette.footerColor,
            color: theme.palette.footerText,
        };
        var footerMenuHeader = {
            fontWeight: 500,
            color: theme.palette.footerHeaderText,
            textTransform: 'uppercase'
        };
        return (
            <footer className="Footer" style={footerStyle}>
                <div className="container">
                    <div className="row">
                        <div className="three columns">
                            <h3 className="Footer__section-header" style={footerMenuHeader}>Re/Max 1st Class</h3>
                            <ul className="Footer__address list-unstyled">
                                <li>
                                    <span >4023 W. Church St.</span>
                                </li>
                                <li>
                                    <span>Skokie IL, 60076</span>
                                </li>

                                <li>
                                    <span>
                                        Phone: (847) 674-9797
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Fax: (847) 674-0411
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </footer>
        );
    }
}
