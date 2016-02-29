import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router'
import _ from 'lodash';

/*Components*/

class Pagination extends React.Component {
    static contextTypes = {location: PropTypes.object.isRequired};

    static propTypes = {
        lastPage: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        pageInfo: PropTypes.object.isRequired,
    };

    componentDidMount() {
        console.log(this.context);
    }

    render() {
        const {lastPage, currentPage, pageInfor}=this.props;
        return (
            <div>
                {lastPage !== this.currentPage &&
                <Link
                    to={{ pathname: this.context.location.pathname, query: { page: this.currentPage+1,after:pageInfo.startCursor} }}>Next</Link>
                }
                {this.currentPage > 1 &&
                <div><Link
                    to={{ pathname: this.context.location.pathname, query: { page: this.currentPage-1,before:pageInfo.endCursor} }}>Prev</Link>
                </div>
                }
            </div>
        );
    }
}
;
export default Pagination;

