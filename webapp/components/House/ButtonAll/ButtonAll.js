import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

/*Components*/
import SvLink from './../../Common/SvLink/SvLink';

import styles from './ButtonAll.less';

class ButtonAll extends React.Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        btnLabel: PropTypes.string.isRequired
    };

    render() {
        let {url, btnLabel}=this.props;
        if (url.match(/all$/g)) {
            url += '/1';
        }
        return (
            <div className={styles.row}>
                <div className={styles.col1}>
                    <div className={styles.btnContainer}>
                        <SvLink url={url}>
                            <RaisedButton
                                label={btnLabel}
                                secondary={true}/>
                        </SvLink>
                    </div>
                </div>
            </div>
        );
    }
}
export default ButtonAll;
