import React, {PropTypes} from 'react';
/*=styles*/
import styles from './H1Header.less';

class H1Header extends React.Component {

    render() {
        return (
            <div>
                <h1 className={styles.h1}> {this.props.children} </h1>
            </div>
        );
    }
}

export default  H1Header;
