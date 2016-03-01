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
        firstCursor: PropTypes.string.isRequired,
        lastCursor: PropTypes.string.isRequired,
    };
    handleClick = (e, type)=> {
        if (type == 'prev') {
            if (this.currentPage === 1) {
                e.preventDefault();
            }

        }
    };

    render() {
        var disabledLink = {
            pointerEvents: "none",
            cursor: "default"
        };
        const {lastPage, firstCursor, lastCursor} = this.props;
        this.currentPage = Number(this.context.location.query.page || 1);

        return (
            <div className={styles.row}>
                <div className={styles.col2}>
                    <span className={styles.pagesCounter}> {`Page ${this.currentPage} of ${lastPage}`} </span>
                </div>

                <div className={styles.col2}>
                    <div className={styles.breadcrumbs}>
                        <div className={styles.linkContainer}>
                            <Link style={{width:"100%"}}
                                  styles={this.currentPage==1 && disabledLink}
                                to={{ pathname: this.context.location.pathname, query: { page: this.currentPage-1,before:firstCursor} }}
                                onClick={this.handleClick}>
                                <RaisedButton
                                    style={{width:"140px"}}
                                    className={styles.button}
                                    disabled={this.currentPage==1}
                                    label="Previous"
                                    labelPosition="after"
                                    icon={<Previous />}
                                    default={true}/>
                            </Link>
                        </div>
                        <div className={styles.linkContainer}>
                            <Link
                                styles={(this.currentPage == lastPage) && disabledLink}
                                to={{ pathname: this.context.location.pathname, query: { page: this.currentPage + 1,after:lastCursor} }}>
                                <RaisedButton className={styles.button} label="Next"
                                              style={{width:"140px"}}
                                              icon={<Next />}
                                              default={true}/>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
;
export default Pagination;

