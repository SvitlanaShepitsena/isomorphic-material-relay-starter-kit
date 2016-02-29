import React, {PropTypes} from 'react';
import {Link} from 'react-router'
/*=materialUi*/
import FlatButton from 'material-ui/lib/flat-button';

/*=styles*/
import styles from './Pagination.less';

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
            <div className={styles.container}>
                {currentPage > 1 &&
                <div>
                    <Link
                        to={{ pathname: this.context.location.pathname, query: { page: currentPage-1,before:pageInfo.endCursor} }}>
                        <FlatButton label="Previous"
                                    secondary={true}/>
                    </Link>
                </div>
                }
                {lastPage !== currentPage &&
                <div>
                    <Link
                        to={{ pathname: this.context.location.pathname, query: { page: currentPage+1,after:pageInfo.startCursor} }}>
                        <FlatButton label="Next" secondary={true}/>
                    </Link>
                </div>
                }
            </div>
        );
    }
}
;
export default Pagination;

