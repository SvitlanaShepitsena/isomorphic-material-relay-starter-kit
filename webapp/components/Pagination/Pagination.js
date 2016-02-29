import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router'

import FlatButton from 'material-ui/lib/flat-button';
import _ from 'lodash';

/*Components*/

class Pagination extends React.Component {
    static contextTypes = {location: PropTypes.object.isRequired};

    static propTypes = {
        lastPage: PropTypes.number.isRequired,
        pageInfo: PropTypes.object.isRequired,
    };

    render() {
        const {lastPage, pageInfo} = this.props;
        const currentPage = Number(this.context.location.query.page || 1);
        return (
            <div>
                {lastPage !== currentPage &&
                <Link
                    to={{ pathname: this.context.location.pathname, query: { page: currentPage+1,after:pageInfo.startCursor} }}>
                    <FlatButton label="Next" secondary={true}/>
                </Link>
                }
                {currentPage > 1 &&
                <div><Link
                    to={{ pathname: this.context.location.pathname, query: { page: currentPage-1,before:pageInfo.endCursor} }}>Prev</Link>
                </div>
                }
            </div>
        );
    }
}
;
export default Pagination;

