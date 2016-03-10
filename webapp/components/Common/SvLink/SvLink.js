import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

class SvLink extends React.Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        removePage: PropTypes.bool
    };
    static contextTypes = {location: PropTypes.object.isRequired};

    render() {
        const href = this.props.url.trim().toLowerCase().replace(/\s+/g, '-');
        var pathname = this.context.location.pathname;
        if (this.props.removePage) {
            let start = pathname.lastIndexOf('/');
            pathname = pathname.substring(0, start);
        }
        let fullUrl = (`${pathname}/${href}`).replace(/\/+/g, '/');
        if (this.props.removePage) {
            fullUrl += '/1';
        }
        const anchor = _.startCase(href);
        let {children}= this.props;
        return (
            <div >
                {children &&
                <Link to={fullUrl}>{children}</Link>
                }
                {!children &&
                <Link to={fullUrl}>{anchor}</Link>
                }

            </div>
        );
    }
}
export default SvLink;
