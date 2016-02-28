import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

class Breadcrumbs extends React.Component {
    static contextTypes = {
        route: PropTypes.object.isRequired,
        params: PropTypes.object.isRequired
    };

    render() {
        let paths = _.compact(this.context.route.path.split('/'));
        let lastIndex = paths.length - 1;
        let params = this.context.params;

        let compoundUrl = '';
        let compoundAnchors = '';

        return (
            <div>
                {paths.map((path, index)=> {
                    var url, paramName, pre;
                    if (path.match('^:')) {
                        paramName = path.substr(1);

                        url = params[paramName];
                        const anchor = _.startCase(url);

                        switch (paramName) {
                            case 'city':
                                compoundAnchors += ` in ${anchor}`;

                                break;
                            case 'zipType':

                                if (url.match(/\d+/g)) {

                                    compoundAnchors += ` at ${anchor}`;
                                } else {
                                    compoundAnchors = compoundAnchors.replace('Houses', anchor);

                                }

                                break;
                            case 'zip':
                                if (url.match(/\d+/g)) {

                                    compoundAnchors += ` at ${anchor}`;
                                }
                                break;
                            case 'type':
                                compoundAnchors = compoundAnchors.replace('Houses', anchor);

                                break;
                            case 'id':
                                compoundAnchors = ` ${anchor}`;

                                break;
                            default:
                                pre = `,`;
                        }

                    } else {

                        url = path;
                        compoundAnchors += _.startCase(url);

                    }
                    compoundUrl += `/${url}`;

                    return (
                        <span key={path}>
                            {index > 0 && <span> > </span>}
                            {index < lastIndex ? <Link
                                to={`${compoundUrl}`}>{compoundAnchors.replace(/Houses For Sale >/i, 'Chicago Suburbs >')}</Link> :
                                <span>{compoundAnchors}</span>
                            }
                        </span>
                    );
                })}

            </div>
        );
    }
}
export default Breadcrumbs;
