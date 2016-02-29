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
        const {lastPage, firstCursor, lastCursor} = this.props;
        this.currentPage = Number(this.context.location.query.page || 1);

        return (
            <div className={styles.container}>
                <div>
                    {`${this.currentPage} of ${lastPage}`}
                </div>

                <div>
                    <Link
                        to={{ pathname: this.context.location.pathname, query: { page: this.currentPage-1,before:firstCursor} }}
                        onClick={this.handleClick}>
                        <RaisedButton
                            className={styles.button}
                            label="Previous"
                            disabled={this.currentPage==1}
                            labelPosition="after"
                            icon={<Previous />}
                            default={true}/>
                    </Link>
                </div>


                <div >
                    <Link
                        to={{ pathname: this.context.location.pathname, query: { page: this.currentPage+1,after:lastCursor} }}>
                        <RaisedButton className={styles.button} label="Next"
                                      disabled={this.currentPage==lastPage}
                                      icon={<Next />}
                                      default={true}/>
                    </Link>
                </div>

            </div>
        );
    }
}
;
export default Pagination;

