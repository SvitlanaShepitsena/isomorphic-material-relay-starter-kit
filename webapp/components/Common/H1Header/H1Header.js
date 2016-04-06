import React, {PropTypes} from 'react';
/*=styles*/
import styles from './H1Header.less';

class H1Header extends React.Component {

    render() {
        return (
            <h1 className={styles.h1}> {this.props.children} </h1>
        );
    }
}

export default  H1Header;
