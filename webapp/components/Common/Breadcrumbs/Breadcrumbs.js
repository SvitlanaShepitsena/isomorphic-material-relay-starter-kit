import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

class Breadcrumbs extends React.Component {
    static contextTypes = {
        route: PropTypes.object.isRequired,
        params: PropTypes.object.isRequired
    };

    render() {
        let paths = _.compact(this.context.route.path.split('/')).map(route=>route.replace(/[\(\)]/g,''));

        let lastIndex = paths.length - 1;
        let {params} = this.context;

        let compoundUrl = '';
        let compoundAnchors = '';

        return (
            <div style={{marginTop: 12}}>
                {paths.map((path, index)=> {
                    var url, paramName, pre;
                    if (path.match('^:')) {
                        paramName = path.substr(1);
                        url = params[paramName];
                        let anchor = _.startCase(url);
                        if (_.last(anchor !== 's')) {
                            anchor += 's'
                        }
                        const digits = url.match(/^\d+$/g);
                        const replaceHouses = compoundAnchors.replace('Houses', anchor);

                        switch (paramName) {
                            case 'city':
                                compoundAnchors += ` in ${anchor}`;
                                break;
                            case 'zipType':
                                if (digits) {
                                    compoundAnchors += ` at ${anchor}`;

                                } else {
                                    compoundAnchors = replaceHouses;
                                }
                                break;
                            case 'type':
                                compoundAnchors = replaceHouses;
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

                    const linkText = compoundAnchors.replace(/Houses For Sale >/i, 'Chicago Suburbs >');

                    return (
                        <span key={path}>
                            {index > 0 && <span> > </span>}
                            {index < lastIndex ? <Link
                                to={`${compoundUrl}`}>
                                {linkText}
                            </Link> : <span>{compoundAnchors}</span>
                            }
                        </span>
                    );
                })}

            </div>
        );
    }
}
export default Breadcrumbs;
