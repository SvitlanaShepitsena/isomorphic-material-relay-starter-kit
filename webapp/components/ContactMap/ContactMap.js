import React, {PropTypes} from 'react';
import Card from 'material-ui/lib/card/card';
import styles from './ContactMap.less';

class ContactCard extends React.Component {
    static propTypes = {};

    render() {

        return (
            <div className={styles.iframeResponsive}>
                <iframe src="https://www.google.com/maps/d/embed?mid=zdTHzl0THQeM.kIf77Vwre964" width="640"
                    height="480"></iframe>
            </div>
        );
    }
}
export default ContactCard;
