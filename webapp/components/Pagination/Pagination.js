import React, {PropTypes} from 'react';
import {Link} from 'react-router'
/*=materialUi*/
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import Next from 'material-ui/lib/svg-icons/navigation/chevron-right';
import Previous from 'material-ui/lib/svg-icons/navigation/chevron-left';
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
                        <RaisedButton className={styles.button} label="Previous"
                                      labelPosition="after"
                                      icon={<Previous />}
                                      default={true}/>
                    </Link>
                </div>
                }
                {lastPage !== currentPage &&
                <div >
                    <Link
                        to={{ pathname: this.context.location.pathname, query: { page: currentPage+1,after:pageInfo.startCursor} }}>
                        <RaisedButton className={styles.button} label="Next"
                                      icon={<Next />}
                                      default={true}/>
                    </Link>
                </div>
                }
            </div>
        );
    }
}
;
export default Pagination;

