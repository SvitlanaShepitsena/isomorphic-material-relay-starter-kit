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
            // we need to check that the part we drop is page.

            const lastParam = pathname.substring(start + 1);
            if (lastParam.match(/^\d+$/g)) {
                pathname = pathname.substring(0, start);
            }

        }
        let fullUrl = (`${pathname}/${href}`).replace(/\/+/g, '/');
        if (this.props.removePage) {
            if (!fullUrl.match(/(\/1)$/)) {

                fullUrl += '/1';
            }
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
