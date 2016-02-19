import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

class SvLink extends React.Component {
    static propTypes = {url: PropTypes.string.isRequired};
    static contextTypes = {location: PropTypes.object.isRequired};

    render() {
        const href = this.props.url.trim().toLowerCase().replace(/\s+/g, '-');
        const fullUrl = `${this.context.location.pathname}/${href}`;
        const anchor = _.startCase(href);
        return (
            <div>
                {this.props.children && 
                <Link to={fullUrl}>{this.props.children}</Link>
                }
                {!this.props.children &&
                <Link to={fullUrl}>{anchor}</Link>
                }

            </div>
        );
    }
}
;
export default SvLink;
