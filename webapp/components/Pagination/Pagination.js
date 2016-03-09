import React, {PropTypes} from 'react';
import {Link} from 'react-router'
/*=materialUi*/
import RaisedButton from 'material-ui/lib/raised-button';
import Next from 'material-ui/lib/svg-icons/navigation/chevron-right';
import Previous from 'material-ui/lib/svg-icons/navigation/chevron-left';
/*=styles*/
import styles from './Pagination.less';

class Pagination extends React.Component {
    static contextTypes = {location: PropTypes.object.isRequired};
    static propTypes = {
        lastPage: PropTypes.number.isRequired,
    };
    handleClick = (e, type)=> {
        if (type == 'prev') {
            if (this.currentPage === 1) {
                e.preventDefault();
            }
        }
    };

    render() {
        const {lastPage} = this.props;
        this.currentPage = Number(this.context.location.query.page || 1);
        let pathname = this.context.location.pathname;
        let currentPage = this.currentPage;
        let prevPage = currentPage - 1;
        let nextPage = currentPage + 1;

        let enablePrev = currentPage > 1;
        let enableNext = currentPage !== lastPage;

        let disablePrev = currentPage == 1;
        let disableNext = currentPage == lastPage;

        return (
            <div className={styles.row}>
                <div className={styles.col2}>
                    <span className={styles.counter}> {`Page ${currentPage} of ${lastPage}`} </span>
                </div>
                <div className={styles.col2}>
                    <div className={styles.breadcrumbs}>
                        <div className={styles.linkContainer}>
                            {enablePrev &&
                            <Link data-link='prev' to={{ pathname: pathname, query: { page: prevPage} }}

                                  onClick={this.handleClick}>
                                <RaisedButton className={styles.button} default={true} disabled={currentPage==1}
                                              icon={<Previous />} label="Previous" labelPosition="after"/>
                            </Link>
                            }
                            {disablePrev &&
                            <RaisedButton className={styles.button} default={true} disabled={true} icon={<Previous />}
                                          label="Previous" labelPosition="after"/>
                            }
                        </div>
                        <div className={styles.linkContainer}>
                            {enableNext &&
                            <Link data-link='next' to={{ pathname: pathname, query: { page: nextPage} }}>
                                <RaisedButton className={styles.button} default={true} icon={<Next />} label="Next"/>
                            </Link>
                            }
                            {disableNext &&
                            <RaisedButton className={styles.button} default={true} disabled={true} icon={<Next />}
                                          label="Next"/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
;
export default Pagination;

