import React, {PropTypes} from 'react';
import {Link} from 'react-router'
/*=materialUi*/
import RaisedButton from 'material-ui/lib/raised-button';
import Next from 'material-ui/lib/svg-icons/navigation/chevron-right';
import Previous from 'material-ui/lib/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/lib/icon-button';

/*=styles*/
import styles from './Pagination.less';
import _ from 'lodash';

class Pagination extends React.Component {
    static contextTypes = {location: PropTypes.object.isRequired};
    static propTypes = {lastPage: PropTypes.number.isRequired};

    handleClick = (e, type)=> {
        if (type == 'prev') {
            if (this.currentPage === 1) {
                e.preventDefault();
            }
        }
    };

    render() {
        const {lastPage} = this.props;
        var origPath = this.context.location.pathname;
        let finish = origPath.lastIndexOf('/') + 1;
        let pathNames = origPath.split('/');
        this.currentPage = Number(_.last(pathNames));

        let pathname = origPath.substr(0, finish);

        let currentPage = this.currentPage;
        let prevPage = `${pathname}${currentPage - 1}`;
        let nextPage = `${pathname}${currentPage + 1}`;

        let enablePrev = currentPage > 1;
        let enableNext = currentPage !== lastPage;

        let disablePrev = currentPage == 1;
        let disableNext = currentPage == lastPage;
        const pageCounter = `Page ${currentPage} of ${lastPage}`;

        return (
            <div className={styles.row}>
                <div className={styles.col2}>
                    <div className={styles.counterContainer}>
                        <span className={styles.counter}> {pageCounter}</span>
                    </div>
                </div>
                <div className={styles.col2}>
                    <div className={styles.breadcrumbs}>
                        <div className={styles.linkContainer}>
                            {enablePrev &&
                            <Link data-link='prev' to={{pathname: prevPage}}
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
                            <Link data-link='next' to={{ pathname: nextPage}}>
                                <RaisedButton className={styles.button} default={true} icon={<Next />}
                                              labelPosition="before" label="Next"/>
                            </Link>
                            }
                            {disableNext &&
                            <RaisedButton className={styles.button} default={true} disabled={true} icon={<Next />}
                                          label="Next"/>
                            }
                        </div>
                    </div>
                    <div className={styles.breadcrumbsMobile}>
                        <div className={styles.linkContainer}>
                            {enablePrev &&
                            <Link data-link='prev' to={{pathname: prevPage}}
                                  onClick={this.handleClick}>
                                <IconButton disabled={currentPage==1} className={styles.button} default={true}>
                                    <Previous />
                                </IconButton>
                            </Link>
                            }
                            {disablePrev &&
                            <IconButton disabled={currentPage==1} className={styles.button} default={true}
                                        disabled={true}>
                                <Previous />
                            </IconButton>
                            }
                        </div>
                        <div className={styles.linkContainer}>
                            {enableNext &&
                            <Link data-link='next' to={{ pathname: nextPage}}>
                                <IconButton className={styles.button} default={true}>
                                    <Next />
                                </IconButton>
                            </Link>
                            }
                            {disableNext &&
                            <IconButton className={styles.button} default={true} disabled={true}>
                                <Next />
                            </IconButton>
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

