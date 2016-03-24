import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

class Breadcrumbs extends React.Component {
    static contextTypes = {
        route: PropTypes.object.isRequired,
        params: PropTypes.object.isRequired
    };

    render() {
        var basicPath = this.context.route.path.replace('/residential', '');

        let paths = _.compact(basicPath.split('/')).map(route=>route.replace(/[\(\)]/g, ''));

        let {params} = this.context;

        let compoundUrl = '';
        let compoundAnchors = '';
        var last = _.last(paths);
        if (last.indexOf('realty') > -1 || last.indexOf('page') > -1) {
            paths = _.initial(paths);
        }
        let lastIndex = paths.length - 1;

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
                            case 'zip':
                            case 'zipType':
                                if (digits) {
                                    compoundAnchors += ` at ${anchor}`;
                                    url += '/1';

                                } else {
                                    compoundAnchors = replaceHouses;
                                }
                                break;
                            case 'type':
                                compoundUrl = compoundUrl.substr(0, compoundUrl.length - 2);
                                url += '/1';
                                compoundAnchors = replaceHouses;
                                break;
                            case 'id':
                                compoundAnchors = ` ${anchor}`;
                                break;
                            case 'realty':
                                break;

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
