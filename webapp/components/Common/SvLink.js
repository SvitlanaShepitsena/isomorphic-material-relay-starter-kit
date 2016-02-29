import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

class SvLink extends React.Component {
    static propTypes = {url: PropTypes.string.isRequired};
    static contextTypes = {location: PropTypes.object.isRequired};

    render() {
        const href = this.props.url.trim().toLowerCase().replace(/\s+/g, '-');
        const fullUrl = (`${this.context.location.pathname}/${href}`).replace(/\/+/g, '/');
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
