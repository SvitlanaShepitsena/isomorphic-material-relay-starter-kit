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
        firstCursor: PropTypes.string.isRequired,
        lastCursor: PropTypes.string.isRequired,
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
        const {lastPage, firstCursor, lastCursor} = this.props;
        this.currentPage = Number(this.context.location.query.page || 1);
        let pathname = this.context.location.pathname;
        let currentPage = this.currentPage;
        let previous = currentPage - 1;
        let next = currentPage + 1;

        return (
            <div className={styles.row}>
                <div className={styles.col2}>
                    <span className={styles.counter}> {`Page ${currentPage} of ${lastPage}`} </span>
                </div>
                <div className={styles.col2}>
                    <div className={styles.breadcrumbs}>
                        <div className={styles.linkContainer}>

                            {currentPage == 1 &&
                            <RaisedButton
                                className={styles.button}
                                disabled={true}
                                label="Previous"
                                labelPosition="after"
                                icon={<Previous />}
                                default={true}/>
                            }
                            {currentPage > 1 &&
                            <Link to={{ pathname: pathname, query: { page: previous, before:firstCursor} }}
                                  onClick={this.handleClick}>
                                <RaisedButton
                                    className={styles.button}
                                    disabled={currentPage==1}
                                    label="Previous"
                                    labelPosition="after"
                                    icon={<Previous />}
                                    default={true}/>
                            </Link>}


                        </div>
                        <div className={styles.linkContainer}>
                            {currentPage == lastPage &&
                            <RaisedButton className={styles.button} label="Next"
                                          disabled={true}
                                          icon={<Next />}
                                          default={true}/>
                            }
                            {currentPage !== lastPage &&
                            <Link to={{ pathname: pathname, query: { page: next, after:lastCursor} }}>
                                <RaisedButton className={styles.button}
                                              label="Next"
                                              icon={<Next />}
                                              default={true}/>
                            </Link>
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

